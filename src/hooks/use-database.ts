import type { ServerMessage } from 'server'

import { serverEndpoint } from 'src/constants/server-config'
import { logger } from 'src/utils/logger'

/**
 * Send a message to the database for logging user feedback or errors that are provided.
 */
export const useDatabase = (type: 'error' | 'feedback') => {
  return async (message: string = '') => {
    const feedbackMessage: ServerMessage = {
      payload: { message },
      type,
    }

    try {
      await fetch(serverEndpoint.svgr, {
        body: JSON.stringify(feedbackMessage),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
    } catch (error) {
      logger.error('Could not send feature request.', error)
    }
  }
}
