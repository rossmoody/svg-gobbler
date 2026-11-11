import type { StorageSvg } from 'src/scripts'

import { renderHook } from '@testing-library/react'
import { StorageUtilities } from 'src/utilities/storage-utilities'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useMainActions } from './use-main-actions'

const item = (id: string): StorageSvg => ({
  corsRestricted: false,
  id,
  lastEdited: '',
  name: id,
  svg: `<svg id="${id}"/>`,
})

const { collection } = vi.hoisted(() => ({
  collection: { collectionId: 'source', data: [] as unknown[], selected: [] as unknown[] },
}))

vi.mock('react-router-dom', () => ({ useRevalidator: () => ({ revalidate: vi.fn() }) }))
vi.mock('src/providers', () => ({
  useCollection: () => ({ dispatch: vi.fn(), state: collection }),
}))

const store = new Map<string, unknown>()
const set = vi.fn(async (items: Record<string, unknown>) => {
  for (const [key, value] of Object.entries(items)) store.set(key, value)
})

const page = (...data: StorageSvg[]) => ({ data, host: '', href: '', origin: '' })
const storedIds = async (collectionId: string) => {
  const { data } = await StorageUtilities.getPageData(collectionId)
  return data.map((svg) => svg.id)
}

beforeEach(async () => {
  store.clear()
  set.mockClear()
  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.stubGlobal('chrome', {
    storage: { local: { get: async (key: string) => ({ [key]: store.get(key) }), set } },
  })

  collection.data = [item('a'), item('b')]
  collection.selected = [collection.data[0]]
  await StorageUtilities.setPageData('source', page(item('a'), item('b')))
  await StorageUtilities.setPageData('target', page(item('t')))
})

describe('useMainActions.moveSelectedItems', () => {
  it('moves the selected items to the target collection', async () => {
    const { result } = renderHook(() => useMainActions())

    await result.current.moveSelectedItems('target')

    expect(await storedIds('target')).toEqual(['a', 't'])
    expect(await storedIds('source')).toEqual(['b'])
  })

  it('leaves the items where they are when the target cannot be saved', async () => {
    const { result } = renderHook(() => useMainActions())
    set.mockRejectedValueOnce(new Error('QUOTA_BYTES quota exceeded'))

    await result.current.moveSelectedItems('target')

    expect(await storedIds('target')).toEqual(['t'])
    expect(await storedIds('source')).toEqual(['a', 'b'])
  })
})
