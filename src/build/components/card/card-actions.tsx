import React from 'react'

import SVGInterface from '../../../find/scripts/create-svg'

import CardActionFooter from './card-action-footer'
import CardActionCors from './card-action-cors'

interface CardActions {
  data: SVGInterface
}

const CardActions = ({ data }: CardActions) => {
  if (data.cors && data.imgSrcHref) {
    return <CardActionCors forwardingUrl={data.imgSrcHref} />
  } else {
    return <CardActionFooter svgString={data.svgString} />
  }
}

export default CardActions
