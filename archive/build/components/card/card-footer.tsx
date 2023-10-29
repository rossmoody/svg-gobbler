import { Box, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import SVG from 'src/process/SVG'
import loc from '../utils/localization'
import Body from './card-footer-body'
import Subhead from './card-footer-subhead'

type Props = {
  data: SVG
}

const CardFooter = ({ data }: Props) => {
  return (
    <SimpleGrid minChildWidth="30px" spacing={2}>
      <Box>
        <Subhead>{loc('card_menu_type')}</Subhead>
        <Body>{data.type.charAt(0).toUpperCase() + data.type.slice(1)}</Body>
      </Box>
      <Box>
        <Subhead>{loc('card_menu_size')}</Subhead>
        <Body>{data.size}</Body>
      </Box>
    </SimpleGrid>
  )
}

export default CardFooter
