import React from 'react'
import SVG from '../../../find/SVG'
import CardActionCors from './card-action-cors'
import CardActionFooter from './card-action-footer'

interface CardActions {
  data: SVG
}

const CardActions = ({ data }: CardActions) => {
  const {
    cors,
    imgSrcHref,
    elementAsString: svgString,
    height,
    width,
    whiteFill,
  } = data

  const corsImg = cors && imgSrcHref

  if (corsImg) {
    return <CardActionCors forwardingUrl={imgSrcHref!} />
  }

  return (
    <CardActionFooter
      svgString={svgString!}
      height={Number(height) || 24}
      width={Number(width) || 24}
      whiteFill={whiteFill}
    />
  )
}

export default CardActions
