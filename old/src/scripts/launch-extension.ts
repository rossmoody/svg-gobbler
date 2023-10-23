import { findSVGs } from './find-svgs'
import { createNewTab, executeScript } from './helpers'

/**
 * Dynamically determine how to open the extension based on if it's a system page
 */
export const launchExtension = () => {
  chrome.action.onClicked.addListener(async ({ url }) => {
    const isSystemPage = Boolean(url?.includes('chrome://'))

    switch (isSystemPage) {
      case true: {
        /**
         * Create an empty page if on system page
         * TODO: Create a system page for accurate representation
         */
        createNewTab('./pages/index.html', {
          data: [],
          action: 'gobble',
          url: 'Dashboard',
        })
        break
      }

      default: {
        const { id } = (
          await chrome.tabs.query({ active: true, currentWindow: true })
        )[0]

        if (id) {
          try {
            const data = await executeScript(id, findSVGs)
            const url = await executeScript(id, () => document.location.host)
            const location = await executeScript(
              id,
              () => document.location.origin,
            )
            createNewTab('./pages/index.html', {
              data,
              action: 'gobble',
              location,
              url,
            })
          } catch (error) {
            /**
             * Create an empty page if it errors.
             * TODO: Surface an error page
             */
            createNewTab('./pages/index.html', {
              data: [],
              action: 'gobble',
              url: 'Dashboard',
            })
          }
        }
      }
    }
  })
}
