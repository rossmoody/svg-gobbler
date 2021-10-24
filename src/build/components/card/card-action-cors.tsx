import { Button, Grid, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import Tooltip from '../generic/tooltip'
import loc from '../utils/localization'

const CardActionCors = ({ forwardingUrl }: { forwardingUrl: string }) => {
  return (
    <Grid
      position="absolute"
      templateColumns="1fr"
      top="12px"
      bottom={0}
      left={0}
      right={0}
      bg={useColorModeValue('white', 'gray.700')}
    >
      <Tooltip label="This SVG is protected by cross-origin requests and must be opened in a new tab to gobble.">
        <Button as="a" href={forwardingUrl}>
          {loc('card_open')}
        </Button>
      </Tooltip>
    </Grid>
  )
}

export default CardActionCors
