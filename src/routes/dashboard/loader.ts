/**
 * The primary initialization function for client context.
 */
export async function loader() {
  const { collections } = await chrome.storage.local.get('collections')
  return collections
}
