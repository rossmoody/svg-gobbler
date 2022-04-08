/**
 * Query the current active tab and return its id.
 */
export async function getActiveTab() {
  return (await chrome.tabs.query({ active: true, currentWindow: true }))[0]
}

/**
 * Inject scripts into a given tabId.
 * The function returns the result of whatever function is passed in.
 */
export async function executeScript(tabId: number, func: () => any) {
  return (
    await chrome.scripting.executeScript({
      target: { tabId },
      func,
    })
  )[0].result
}
