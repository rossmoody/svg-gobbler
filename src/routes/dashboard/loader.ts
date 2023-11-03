/**
 * The primary initialization function for sidebar collections context.
 */
export async function dashboardLoader() {
  const { collections } = await chrome.storage.local.get('collections')
  return collections
}
