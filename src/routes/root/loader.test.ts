import type { Collection, PageData } from 'src/types'

import { StorageUtilities } from 'src/utilities/storage-utilities'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { rootLoader } from './loader'

// Modules imported by the loader read translations at import time, so a
// minimal chrome global has to exist before any import runs.
vi.hoisted(() => {
  vi.stubGlobal('chrome', { i18n: { getMessage: (key: string) => key } })
})

const store = new Map<string, unknown>()
const sendMessage = vi.fn()

beforeEach(() => {
  store.clear()
  sendMessage.mockReset()
  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('ok'))
  vi.stubGlobal('chrome', {
    i18n: { getMessage: (key: string) => key },
    runtime: { getManifest: () => ({ permissions: [] }), sendMessage },
    storage: {
      local: {
        get: async (key: string) => ({ [key]: store.get(key) }),
        set: async (items: Record<string, unknown>) => {
          for (const [key, value] of Object.entries(items)) store.set(key, value)
        },
      },
    },
  })
})

const load = async () => {
  const { data } = (await rootLoader()) as unknown as { data: { collectionId: Promise<string> } }
  return data.collectionId
}

const storedCollections = () => StorageUtilities.getStorageData<Collection[]>('collections')

describe('rootLoader', () => {
  it('creates an empty collection when there is nothing to gobble and none exist', async () => {
    sendMessage.mockRejectedValue(new Error('Receiving end does not exist'))

    const id = await load()

    expect(id).toBeTruthy()
    expect(await storedCollections()).toEqual([expect.objectContaining({ id })])
    const pageData = await StorageUtilities.getPageData(id)
    expect(pageData.data).toEqual([])
  })

  it('falls back to the first existing collection', async () => {
    sendMessage.mockRejectedValue(new Error('Receiving end does not exist'))
    const existing: Collection[] = [
      { href: 'https://a.com/', id: 'first', name: 'a.com', origin: 'https://a.com' },
      { href: 'https://b.com/', id: 'second', name: 'b.com', origin: 'https://b.com' },
    ]
    await StorageUtilities.setStorageData('collections', existing)

    expect(await load()).toBe('first')
    expect(await storedCollections()).toEqual(existing)
  })

  it('stores gobbled svgs as a new collection without adding an empty one', async () => {
    const data: PageData = {
      data: [
        {
          corsRestricted: false,
          id: 'svg-1',
          lastEdited: '2026-01-01T00:00:00.000Z',
          name: 'logo',
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><path d="M0 0"/></svg>',
        },
      ],
      host: 'example.com',
      href: 'https://example.com/page',
      origin: 'https://example.com',
    }
    sendMessage.mockResolvedValue({ data })

    const id = await load()
    const collections = await storedCollections()

    expect(collections).toHaveLength(1)
    expect(collections?.[0]).toMatchObject({ id, name: 'example.com' })
    const pageData = await StorageUtilities.getPageData(id)
    expect(pageData.data.map((svg) => svg.name)).toEqual(['logo'])
  })
})
