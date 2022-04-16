import React from 'react'
import SVG from '../../../find/SVG'
import CardActionCors from './card-action-cors'
import CardActionFooter from './card-action-footer'

interface Props {
  data: SVG
}

const CardActions = ({ data }: Props) => {
  const corsImg = data.cors && data.imgSrcHref

  if (corsImg) {
    return <CardActionCors forwardingUrl={data.imgSrcHref} />
  }

  return <CardActionFooter data={data} />
}

export default CardActions
