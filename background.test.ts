import { StorageUtilities } from 'src/utilities/storage-utilities'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const store = new Map<string, unknown>()
const listener = () => ({ addListener: vi.fn() })

const contextMenus = {
  create: vi.fn(),
  onClicked: listener(),
  removeAll: vi.fn((callback: () => void) => callback()),
}

beforeEach(() => {
  store.clear()
  contextMenus.create.mockClear()
  contextMenus.removeAll.mockClear()
  vi.resetModules()
  vi.stubGlobal('chrome', {
    action: { onClicked: listener(), setIcon: vi.fn() },
    contextMenus,
    runtime: {
      getManifest: () => ({}),
      onInstalled: listener(),
      onMessage: listener(),
      setUninstallURL: vi.fn(),
    },
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

/**
 * Importing the background script starts the service worker.
 */
const startWorker = async () => {
  await import('./background')
  await vi.waitFor(() => expect(contextMenus.removeAll).toHaveBeenCalled())
}

const saveSetting = (showInContextMenu: boolean) =>
  StorageUtilities.setStorageData('user', { settings: { showInContextMenu } })

describe('background context menu', () => {
  it('creates the menu item on a fresh install', async () => {
    await startWorker()

    expect(contextMenus.create).toHaveBeenCalledWith(expect.objectContaining({ id: 'svg-gobbler' }))
  })

  it('creates the menu item when the setting is on', async () => {
    await saveSetting(true)
    await startWorker()

    expect(contextMenus.create).toHaveBeenCalledTimes(1)
  })

  it('does not bring the menu item back when the user turned it off', async () => {
    await saveSetting(false)
    await startWorker()

    expect(contextMenus.removeAll).toHaveBeenCalledTimes(1)
    expect(contextMenus.create).not.toHaveBeenCalled()
  })

  it('clears the previous item before creating it again on restart', async () => {
    await startWorker()

    const [removed] = contextMenus.removeAll.mock.invocationCallOrder
    const [created] = contextMenus.create.mock.invocationCallOrder
    expect(removed).toBeLessThan(created)
  })
})
