import type { PageData } from 'types'
import Chrome from './chrome-utils'
import { gatherPageData } from './gather-page-data'

/**
 * Functions related to initializing the extension. This includes setting the
 * extension icons and launching the onboarding experience.
 */
class Init {
  /**
   * Initializes SVG Gobbler conditionally based on the type of page the user is
   * currently on. Responsible for getting data from the active tab and sending
   * it to the content script.
   */
  launchSvgGobbler() {
    const onClickHandler = async () => {
      let data = {
        data: [],
        host: 'Settings',
        origin: 'Settings',
      } as PageData

      const activeTab = await Chrome.getActiveTab()

      // Check if the active tab is a system page
      if (!activeTab.url?.includes('chrome://')) {
        data = await Chrome.executeScript(activeTab.id!, gatherPageData)
      }

      // Open the SVG Gobbler page
      await Chrome.createNewTab()
      chrome.runtime.onMessage.addListener((_, __, sendResponse) => {
        sendResponse({ data })
      })
    }

    chrome.action.onClicked.addListener(onClickHandler)
  }
  /**
   * If the extension is installed for the first time, open the onboarding page.
   */
  launchOnboardingExperience() {
    chrome.runtime.onInstalled.addListener(async (details) => {
      if (details.reason === 'install') {
        await Chrome.createNewTab('onboarding.html')
      }
    })
  }

  /**
   * Load the development icon if the extension is running in development mode.
   */
  setExtensionIcons() {
    if (!('update_url' in chrome.runtime.getManifest())) {
      // The extension is running as an unpacked extension
      chrome.action.setIcon({
        path: {
          '16': 'assets/dev/16.png',
          '24': 'assets/dev/24.png',
          '32': 'assets/dev/32.png',
        },
      })
    } else {
      // The extension is running as a packed (installed) extension
      chrome.action.setIcon({
        path: {
          '16': 'assets/prod/16.png',
          '24': 'assets/prod/24.png',
          '32': 'assets/prod/32.png',
          '48': 'assets/prod/48.png',
          '64': 'assets/prod/64.png',
          '128': 'assets/prod/128.png',
          '256': 'assets/prod/256.png',
          '300': 'assets/prod/300.png',
        },
      })
    }
  }
}

export default new Init()
