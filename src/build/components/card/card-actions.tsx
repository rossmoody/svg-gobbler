import React from 'react'

import SVGInterface from '../../../find/scripts/svg-class'

import CardActionFooter from './card-action-footer'
import CardActionCors from './card-action-cors'

interface CardActions {
  data: SVGInterface
}

const CardActions = ({ data }: CardActions) => {
  const { cors, imgSrcHref, svgString, height, width, whiteFill } = data

  if (cors && imgSrcHref) {
    return <CardActionCors forwardingUrl={imgSrcHref} />
  } else {
    return (
      <CardActionFooter
        svgString={svgString!}
        height={height || 24}
        width={width || 24}
        whiteFill={whiteFill}
      />
    )
  }
}

export default CardActions
