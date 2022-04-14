import React from 'react'
import SVGInterface from '../../../find/svg-class'
import CardActionCors from './card-action-cors'
import CardActionFooter from './card-action-footer'

interface CardActions {
  data: SVGInterface
}

const CardActions = ({ data }: CardActions) => {
  const { cors, imgSrcHref, svgString, height, width, whiteFill } = data

  const corsImg = cors && imgSrcHref

  if (corsImg) {
    return <CardActionCors forwardingUrl={imgSrcHref!} />
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
