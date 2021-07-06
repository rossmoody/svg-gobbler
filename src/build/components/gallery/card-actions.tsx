import React from 'react'

import CardActionFooter from './card-action-footer'
import CardActionCors from './card-action-cors'

interface CardActions {
  svgString: string
  cors: boolean
  presentationSvg: string
}

const CardActions = ({ svgString, cors }: CardActions) => {
  if (cors) {
    return <CardActionCors />
  } else {
    return <CardActionFooter svgString={svgString} />
  }
}

export default CardActions
