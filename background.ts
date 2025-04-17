import { DocumentData, findSvg } from 'src/scripts'
import Chrome from 'src/utilities/chrome-utilities'

/**
 * Functions related to initializing the extension. This includes setting the
 * extension icons and launching the onboarding experience.
 */
const Background = {
  /**
   * Sets the uninstall URL for the extension.
   */
  handleUninstall() {
    chrome.runtime.setUninstallURL('https://svggobbler.com/uninstall')
  },

  /**
   * Initializes the extension.
   */
  init() {
    Background.setExtensionIcons()
    Background.launchOnboardingExperience()
    Background.launchExtensionFromOnboarding()
    Background.launchSvgGobbler()
    Background.handleUninstall()
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
          __: chrome.runtime.MessageSender,
          // eslint-disable-next-line
          sendResponse: (response: any) => void,
        ) {
          if (request === 'gobble') {
            sendResponse({ data })
            chrome.runtime.onMessage.removeListener(listener)
          }
        }
        chrome.runtime.onMessage.addListener(listener)

        await Chrome.createNewTab()
      }
    }

    chrome.runtime.onMessage.addListener(onboardingListener)
  },

  /**
   * If the extension is installed for the first time, open the onboarding page.
   */
  launchOnboardingExperience() {
    chrome.runtime.onInstalled.addListener(async (details) => {
      if (details.reason === 'install') {
        await Chrome.createNewTab('onboarding.html')
      }
    })
  },

  /**
   * Initializes SVG Gobbler conditionally based on the type of page the user is
   * currently on. Responsible for getting data from the active tab and sending
   * it to the content script.
   */
  launchSvgGobbler() {
    const onClickHandler = async () => {
      let data = {
        data: [],
        host: 'Collection',
        href: '',
        origin: '',
      } as DocumentData

      const activeTab = await Chrome.getActiveTab()

      // Check if we have a valid active tab
      if (!activeTab || !activeTab.id) {
        console.error('No active tab found or tab ID is missing')
        return
      }

      // Check if the active tab is a system page
      if (!activeTab.url?.includes('chrome://')) {
        data = await Chrome.executeScript(activeTab.id, findSvg)
      }

      // Add a listener
      chrome.runtime.onMessage.addListener(function listener(request, __, sendResponse) {
        if (request === 'gobble') {
          sendResponse({ data })
          chrome.runtime.onMessage.removeListener(listener)
        }
      })

      // Open the SVG Gobbler page
      await Chrome.createNewTab()
    }

    chrome.action.onClicked.addListener(onClickHandler)
  },

  /**
   * Load the development icon if the extension is running in development mode.
   */
  setExtensionIcons() {
    // @ts-ignore
    if (typeof browser !== 'undefined') {
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
}

Background.init()
