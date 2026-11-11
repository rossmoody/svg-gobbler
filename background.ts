import type { UserState } from 'src/providers/user/reducer'

import { isDevelopmentEnvironment } from 'src/constants/server-config'
import { DocumentData, findSvg } from 'src/scripts'
import { extension } from 'src/utilities/extension-utilities'
import { logger } from 'src/utilities/logger'
import { StorageUtilities } from 'src/utilities/storage-utilities'

const CONTEXT_MENU_ID = 'svg-gobbler'

/**
 * Functions related to initializing the extension. This includes setting the
 * extension icons and launching the onboarding experience.
 */
const Background = {
  /**
   * Registers the context menu click handler and brings the menu item in line
   * with the user's setting.
   */
  createContextMenu() {
    // Listeners must be registered synchronously so they survive worker restarts
    chrome.contextMenus.onClicked.addListener((info) => {
      if (info.menuItemId !== CONTEXT_MENU_ID) {
        return
      }

      Background.launchSvgGobbler()
    })

    Background.syncContextMenu()
  },

  /**
   * Sets the uninstall URL for the extension.
   */
  handleUninstall() {
    if (!isDevelopmentEnvironment) {
      chrome.runtime.setUninstallURL('https://svggobbler.com/uninstall')
    }
  },

  /**
   * Initializes the extension.
   */
  init() {
    Background.setExtensionIcons()
    Background.launchOnboardingExperience()
    Background.launchExtensionFromOnboarding()
    Background.launchExtensionFromIcon()
    Background.handleUninstall()
    Background.createContextMenu()
  },

  /**
   * Initializes SVG Gobbler conditionally based on the type of page the user is
   * currently on. Responsible for getting data from the active tab and sending
   * it to the content script.
   */
  launchExtensionFromIcon() {
    chrome.action.onClicked.addListener(Background.launchSvgGobbler)
  },

  /**
   * Launches the extension from the onboarding page.
   */
  launchExtensionFromOnboarding() {
    const onboardingListener = async function (request: { data: DocumentData; type: string }) {
      const { data, type } = request

      if (type === 'launch-svg-gobbler-from-onboarding') {
        const listener = function (
          request: string,
          _: chrome.runtime.MessageSender,
          sendResponse: (response: unknown) => void,
        ) {
          // We manually create a listener to handle the message
          // from the newly created page below
          if (request === 'gobble') {
            sendResponse({ data })
            chrome.runtime.onMessage.removeListener(listener)
          }
        }
        chrome.runtime.onMessage.addListener(listener)
        await extension.createNewTab()
      }
    }

    chrome.runtime.onMessage.addListener(onboardingListener)
  },

  /**
   * If the extension is installed for the first time, open the onboarding page.
   */
  launchOnboardingExperience() {
    if (!isDevelopmentEnvironment) {
      chrome.runtime.onInstalled.addListener(async (details) => {
        if (details.reason === 'install') {
          await extension.createNewTab('onboarding.html')
        }
      })
    }
  },

  async launchSvgGobbler() {
    try {
      let data = {
        data: [],
        host: 'Collection',
        href: '',
        origin: '',
      } as DocumentData

      const activeTab = await extension.getActiveTab()

      // If the extensions is on a system page we bail entirely
      if (extension.isExtensionTab(activeTab)) {
        return
      }

      // If the extension is on a new tab page we create a new tab and bail early
      // The extension won't have a listener on the new tab page and will fail gracefully
      if (extension.isNewTabPage(activeTab)) {
        extension.createNewTab()
        return
      }

      data = await extension.executeScript(activeTab.id!, findSvg)

      chrome.runtime.onMessage.addListener(function listener(request, __, sendResponse) {
        if (request === 'gobble') {
          sendResponse({ data })
          chrome.runtime.onMessage.removeListener(listener)
        }
      })

      extension.createNewTab()
    } catch (error) {
      logger.error('Error while trying to gobble SVGs', error)
    }
  },

  /**
   * Load the development icon if the extension is running in development mode.
   */
  async setExtensionIcons() {
    if (extension.isFirefox) {
      return
    }

    if (!('update_url' in chrome.runtime.getManifest())) {
      // The extension is running as an unpacked extension
      chrome.action.setIcon({
        path: {
          '16': 'assets/dev/16.png',
          '24': 'assets/dev/24.png',
          '32': 'assets/dev/32.png',
          '48': 'assets/dev/48.png',
          '64': 'assets/dev/64.png',
        },
      })
    }
  },

  /**
   * Shows the context menu item only if the user hasn't turned it off. This runs
   * every time the service worker starts, so creating the item unconditionally
   * would bring it back after the user disabled it in settings. Existing items
   * are cleared first because they persist across restarts and creating a
   * duplicate id is an error.
   */
  async syncContextMenu() {
    const user = await StorageUtilities.getStorageData<UserState>('user')
    const enabled = user?.settings?.showInContextMenu ?? true

    chrome.contextMenus.removeAll(() => {
      if (!enabled) return

      chrome.contextMenus.create({
        contexts: ['all'],
        id: CONTEXT_MENU_ID,
        title: 'Search page for SVGs',
      })
    })
  },
}

Background.init()
