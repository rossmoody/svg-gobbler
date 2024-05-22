import { useEffect, useState } from 'react'
import { serverEndpoint } from 'src/constants/server-config'
import { useDetails } from 'src/providers'
import { loc } from 'src/utils/i18n'
import { logger } from 'src/utils/logger'

import { ServerMessage } from '../../../../server/index'

export const useSvgr = () => {
  const [loading, setLoading] = useState(false)

  const {
    dispatch,
    state: { currentString, preview },
  } = useDetails()

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const message: ServerMessage = {
        payload: {
          config: preview.svgr.config,
          state: preview.svgr.state,
          svg: currentString,
        },
        type: 'svgr',
      }

      try {
        const response = await fetch(serverEndpoint.svgr, {
          body: JSON.stringify(message),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        })
        const result = await response.text()
        dispatch({ payload: result, type: 'set-svgr-result' })
      } catch (error) {
        logger.error(error)
        dispatch({ payload: `😥 ${loc('details_svgr_error')}`, type: 'set-svgr-result' })
      }

      setLoading(false)
    })()
  }, [currentString, dispatch, preview.svgr.config, preview.svgr.state])

  return { loading }
}
