import { createNewTab } from './helpers'

/**
 * If the user clicks on the extension icon while on a system page,
 * open the dashboard in a new tab.
 */
export const handleSystemPage = () =>
  chrome.action.onClicked.addListener(async ({ url }) => {
    if (url?.includes('chrome://')) {
      createNewTab('./pages/index.html', {
        data: [],
        action: 'gobble',
        url: 'Dashboard',
      })
    }
  })
