import { useEffect, useState } from 'react'
import { serverEndpoint } from 'src/constants/server-config'
import { useDetails } from 'src/providers'
import { logger } from 'src/utils/logger'

import { SvgrMessage } from '../../../../server/index'

export const useSvgr = () => {
  const [loading, setLoading] = useState(false)

  const {
    dispatch,
    state: { currentString, preview },
  } = useDetails()

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const message: SvgrMessage = {
        config: preview.svgr.config,
        state: preview.svgr.state,
        svg: currentString,
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
        dispatch({ payload: '😥 Error creating the SVGR component', type: 'set-svgr-result' })
      }

      setLoading(false)
    })()
  }, [currentString, dispatch, preview.svgr.config, preview.svgr.state])

  return { loading }
}
