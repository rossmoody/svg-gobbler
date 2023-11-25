import type { Config, State } from '@svgr/core'
import { useEffect } from 'react'
import { serverEndpoint } from 'server/config'
import { useDetails } from 'src/providers'
import { logger } from 'src/utils/logger'

export type SvgrMessage = {
  svg: string
  config: Config
  state: State
}

export const useSvgr = () => {
  const {
    state: { currentString, preview },
    dispatch,
  } = useDetails()

  useEffect(() => {
    ;(async () => {
      const route = `${serverEndpoint.base}/svgr`

      const message: SvgrMessage = {
        svg: currentString,
        config: preview.svgr.config,
        state: preview.svgr.state,
      }

      try {
        const response = await fetch(route, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(message),
        })
        const result = await response.text()
        dispatch({ type: 'set-svgr-result', payload: result })
      } catch (error) {
        logger.error(error)
      }
    })()
  }, [currentString, dispatch, preview.svgr.config, preview.svgr.state])
}
