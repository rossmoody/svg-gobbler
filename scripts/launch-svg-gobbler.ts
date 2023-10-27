import * as utils from './utils'

/**
 * Initializes SVG Gobbler conditionally based on the type of page the user is
 * currently on. Responsible for getting data from the active tab and sending
 * it to the content script.
 */
export function launchSvgGobbler() {
  chrome.action.onClicked.addListener(async ({ url }) => {
    if (url?.includes('chrome://')) {
      // It's a systems or settings page. Launch empty
      return utils.createNewTab()
    }

    try {
      // Gather data from the active tab
      // const id = await utils.getActiveTab()
      // const url = await utils.executeScript(id, () => document.location.host)

      // Create a new tab and send the data to the content script
      const tab = await utils.createNewTab()
      chrome.tabs.sendMessage(tab.id!, { url: 'test' })
    } catch (error) {
      // TODO: Launch empty page with toast error message
      console.log('Error launching SVG Gobbler', error)
    }
  })
}

/**
 * If the extension is installed for the first time, open the onboarding page.
 */
export function launchOnboardingExperience() {
  chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
      utils.createNewTab('onboarding.html')
    }
  })
}
