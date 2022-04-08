import React from 'react'

import SVGInterface from '../../../find/svg-class'

import CardActionFooter from './card-action-footer'
import CardActionCors from './card-action-cors'

interface CardActions {
  data: SVGInterface
}

const CardActions = ({ data }: CardActions) => {
  const { cors, imgSrcHref, divBgUrl, svgString, height, width, whiteFill } =
    data
  const corsDiv = cors && divBgUrl
  const corsImg = cors && imgSrcHref

  if (corsImg) {
    return <CardActionCors forwardingUrl={imgSrcHref!} />
  }

  if (corsDiv) {
    return <CardActionCors forwardingUrl={divBgUrl!} />
  }

  return (
    <CardActionFooter
      svgString={svgString!}
      height={height || 24}
      width={width || 24}
      whiteFill={whiteFill}
    />
  )
}

export default CardActions
