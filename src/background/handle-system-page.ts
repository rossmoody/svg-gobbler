/**
 * If the user clicks on the extension icon while on a system page, open the
 * dashboard in a new tab.
 */
export const handleSystemPage = () =>
  chrome.action.onClicked.addListener(async ({ url }) => {
    const isSystemPage = url?.includes('chrome://')

    if (isSystemPage) {
      chrome.tabs.create({ url: `./pages/index.html`, active: true }, () => {
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
          if (changeInfo.status === 'complete') {
            chrome.tabs.sendMessage(tabId, {
              data: [],
              action: 'gobble',
              url: 'Dashboard',
            })

            chrome.tabs.onUpdated.removeListener(listener)
          }
        })
      })
    }
  })
