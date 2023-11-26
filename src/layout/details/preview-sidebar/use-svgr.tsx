import { useEffect, useState } from 'react'
import { serverEndpoint } from 'src/constants/server-config'
import { useDetails } from 'src/providers'
import { logger } from 'src/utils/logger'
import { SvgrMessage } from '../../../../server/index'

export const useSvgr = () => {
  const [loading, setLoading] = useState(false)

  const {
    state: { currentString, preview },
    dispatch,
  } = useDetails()

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const message: SvgrMessage = {
        svg: currentString,
        config: preview.svgr.config,
        state: preview.svgr.state,
      }

      try {
        const response = await fetch(serverEndpoint.svgr, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(message),
        })
        const result = await response.text()
        dispatch({ type: 'set-svgr-result', payload: result })
      } catch (error) {
        logger.error(error)
        dispatch({ type: 'set-svgr-result', payload: '😥 Error creating the SVGR component' })
      }

      setLoading(false)
    })()
  }, [currentString, dispatch, preview.svgr.config, preview.svgr.state])

  return { loading }
}
