import React from 'react'

import SVGInterface from '../../../find/scripts/svg-class'

import CardActionFooter from './card-action-footer'
import CardActionCors from './card-action-cors'

interface CardActions {
  data: SVGInterface
}

const CardActions = ({ data }: CardActions) => {
  if (data.cors && data.imgSrcHref) {
    return <CardActionCors forwardingUrl={data.imgSrcHref} />
  } else {
    return (
      <CardActionFooter
        svgString={data.svgString!}
        height={data.height || 24}
        width={data.width || 24}
      />
    )
  }
}

export default CardActions
