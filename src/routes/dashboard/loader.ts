/**
 * The primary initialization function for client context.
 */
export async function dashboardLoader() {
  const { collections } = await chrome.storage.local.get('collections')
  return collections
}
