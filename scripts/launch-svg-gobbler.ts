import { createNewTab } from './utils'

/**
 * Initializes SVG Gobbler conditionally based on the type of page the user is
 * currently on. Responsible for getting data from the active tab and sending
 * it to the content script.
 */
export function launchSvgGobbler() {
  chrome.action.onClicked.addListener(async ({ url }) => {
    if (url?.includes('chrome://')) {
      // It's a systems or settings page. Launch empty
      return chrome.tabs.create({ url: './index.html', active: true })
    }

    try {
      const tab = await createNewTab()
      chrome.tabs.sendMessage(tab.id!, { data: 'foo' })
    } catch (error) {
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
      createNewTab('onboarding.html')
    }
  })
}
