type ExecuteScript = <T>(tabId: number, func: () => T) => Promise<T>

/**
 * Helper function for executing scripts in the active tab
 */
export const executeScript: ExecuteScript = async (tabId, func) => {
  const result = await chrome.scripting.executeScript({
    target: { tabId },
    func,
  })

  return result[0].result
}
