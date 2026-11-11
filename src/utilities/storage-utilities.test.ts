import type { StorageSvg, Svg } from 'src/scripts'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  reconcileLoadedData,
  STORAGE_WRITE_ERROR_EVENT,
  StorageUtilities,
} from './storage-utilities'

const store = new Map<string, unknown>()
const set = vi.fn(async (items: Record<string, unknown>) => {
  for (const [key, value] of Object.entries(items)) store.set(key, value)
})
const get = vi.fn(async (key: string) => ({ [key]: store.get(key) }))

beforeEach(() => {
  store.clear()
  set.mockClear()
  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.stubGlobal('chrome', {
    storage: { local: { get, getBytesInUse: async () => 5_242_880, QUOTA_BYTES: 10_485_760, set } },
  })
})

const pageData = {
  data: [{ corsRestricted: false, id: '1', lastEdited: '', name: 'a', svg: '<svg/>' }],
  host: 'example.com',
  href: 'https://example.com/',
  origin: 'https://example.com',
}

describe('StorageUtilities writes', () => {
  it('round-trips compressed page data', async () => {
    expect(await StorageUtilities.setPageData('abc', pageData)).toBe(true)
    expect(typeof store.get('abc')).toBe('string')
    expect(await StorageUtilities.getPageData('abc')).toEqual(pageData)
  })

  it('resolves false and notifies the UI instead of rejecting when a write fails', async () => {
    set.mockRejectedValueOnce(new Error('QUOTA_BYTES quota exceeded'))
    const listener = vi.fn()
    globalThis.addEventListener(STORAGE_WRITE_ERROR_EVENT, listener)

    await expect(StorageUtilities.setStorageData('collections', [])).resolves.toBe(false)

    expect(listener).toHaveBeenCalledTimes(1)
    expect((listener.mock.calls[0][0] as CustomEvent).detail).toEqual({ key: 'collections' })
    globalThis.removeEventListener(STORAGE_WRITE_ERROR_EVENT, listener)
  })

  it('does not notify on a successful write', async () => {
    const listener = vi.fn()
    globalThis.addEventListener(STORAGE_WRITE_ERROR_EVENT, listener)

    await StorageUtilities.setStorageData('view', {})

    expect(listener).not.toHaveBeenCalled()
    globalThis.removeEventListener(STORAGE_WRITE_ERROR_EVENT, listener)
  })
})

describe('StorageUtilities.getStorageUsage', () => {
  it('reports usage against the fixed quota', async () => {
    expect(await StorageUtilities.getStorageUsage()).toEqual({
      bytesInUse: 5_242_880,
      percent: 0.5,
      quotaBytes: 10_485_760,
    })
  })
})

const item = (id: string, overrides: Partial<StorageSvg> = {}): StorageSvg => ({
  corsRestricted: false,
  id,
  lastEdited: '',
  name: id,
  svg: `<svg id="${id}"/>`,
  ...overrides,
})

/** Stands in for the Svg classes the collection loader returns. */
const loadedFrom = (...items: StorageSvg[]) => items as unknown as Svg[]

const storedIds = async (collectionId: string) => {
  const { data } = await StorageUtilities.getPageData(collectionId)
  return data.map((svg) => svg.id)
}

describe('StorageUtilities.updatePageData', () => {
  it('keeps both changes when two updates start at the same time', async () => {
    await StorageUtilities.setPageData('race', { ...pageData, data: [item('a'), item('b')] })

    const remove = (id: string) =>
      StorageUtilities.updatePageData('race', (current) => ({
        ...current,
        data: current.data.filter((svg) => svg.id !== id),
      }))
    const results = await Promise.all([
      remove('a'),
      StorageUtilities.updatePageData('race', (current) => ({
        ...current,
        data: [item('c'), ...current.data],
      })),
    ])

    expect(results).toEqual([true, true])
    expect(await storedIds('race')).toEqual(['c', 'b'])
  })

  it('resolves only once the write has landed', async () => {
    await StorageUtilities.setPageData('landed', { ...pageData, data: [item('a')] })

    await StorageUtilities.updatePageData('landed', (current) => ({ ...current, data: [] }))

    expect(await storedIds('landed')).toEqual([])
  })

  it('keeps going after an update throws or a write fails', async () => {
    await StorageUtilities.setPageData('errors', { ...pageData, data: [item('a')] })
    const add = (id: string) =>
      StorageUtilities.updatePageData('errors', (current) => ({
        ...current,
        data: [...current.data, item(id)],
      }))

    const thrown = StorageUtilities.updatePageData('errors', () => {
      throw new Error('bad update')
    })
    const afterThrow = add('b')
    await expect(thrown).rejects.toThrow('bad update')
    expect(await afterThrow).toBe(true)

    set.mockRejectedValueOnce(new Error('QUOTA_BYTES quota exceeded'))
    const failed = add('lost')
    const afterFailure = add('c')
    expect(await failed).toBe(false)
    expect(await afterFailure).toBe(true)

    expect(await storedIds('errors')).toEqual(['a', 'b', 'c'])
  })

  it('stores what the loader fetched and extracted on the first update', async () => {
    const image = item('img', { svg: '<img src="https://example.com/sprite.svg"/>' })
    await StorageUtilities.setPageData('fresh', { ...pageData, data: [image, item('b')] })
    const loaded = loadedFrom(
      item('img', { svg: '<svg><symbol id="s"/></svg>' }),
      item('symbol', { svg: '<symbol id="s"/>' }),
      item('b'),
    )

    await StorageUtilities.updatePageData(
      'fresh',
      (current) => ({ ...current, data: current.data.filter((svg) => svg.id !== 'symbol') }),
      loaded,
    )

    const { data } = await StorageUtilities.getPageData('fresh')
    expect(data).toEqual([item('img', { svg: '<svg><symbol id="s"/></svg>' }), item('b')])
  })

  it('does not undo earlier updates when the loaded data is out of date', async () => {
    await StorageUtilities.setPageData('stale', { ...pageData, data: [item('a'), item('b')] })
    // Both actions were started from the same render, before any reload.
    const loaded = loadedFrom(item('a'), item('extracted'), item('b'))

    await Promise.all([
      StorageUtilities.updatePageData(
        'stale',
        (current) => ({
          ...current,
          data: current.data
            .filter((svg) => svg.id !== 'extracted')
            .map((svg) => (svg.id === 'a' ? { ...svg, name: 'renamed' } : svg)),
        }),
        loaded,
      ),
      StorageUtilities.updatePageData(
        'stale',
        (current) => ({ ...current, data: current.data.filter((svg) => svg.id !== 'b') }),
        loaded,
      ),
    ])

    const { data } = await StorageUtilities.getPageData('stale')
    expect(data).toEqual([item('a', { name: 'renamed' })])
  })
})

describe('reconcileLoadedData', () => {
  it('places extracted items after the item they came from', () => {
    const result = reconcileLoadedData(
      [item('a'), item('b')],
      loadedFrom(item('first'), item('a'), item('a-1'), item('a-2'), item('b')),
    )
    expect(result.map((svg) => svg.id)).toEqual(['first', 'a', 'a-1', 'a-2', 'b'])
  })

  it('keeps stored items the loader did not return', () => {
    const result = reconcileLoadedData([item('a'), item('hidden')], loadedFrom(item('a')))
    expect(result.map((svg) => svg.id)).toEqual(['a', 'hidden'])
  })
})
