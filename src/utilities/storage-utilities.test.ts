import { beforeEach, describe, expect, it, vi } from 'vitest'

import { STORAGE_WRITE_ERROR_EVENT, StorageUtilities } from './storage-utilities'

const store = new Map<string, unknown>()
const set = vi.fn(async (items: Record<string, unknown>) => {
  for (const [key, value] of Object.entries(items)) store.set(key, value)
})
const get = vi.fn(async (key: string) => ({ [key]: store.get(key) }))

let permissions: string[] = []

beforeEach(() => {
  store.clear()
  permissions = []
  set.mockClear()
  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.stubGlobal('chrome', {
    runtime: { getManifest: () => ({ permissions }) },
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

  it('reports no quota when unlimitedStorage is granted', async () => {
    permissions = ['storage', 'unlimitedStorage']

    expect(await StorageUtilities.getStorageUsage()).toEqual({
      bytesInUse: 5_242_880,
      percent: 0,
      quotaBytes: 0,
    })
  })
})
