import React from 'react'
import { Button, Grid, useColorModeValue, Tooltip } from '@chakra-ui/react'
import { FaExternalLinkAlt } from 'react-icons/fa'

const CardActionCors = () => {
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
      <Tooltip
        hasArrow
        borderRadius="md"
        padding={4}
        label="This SVG is protected by cross-origin requests and must be opened in a new tab to download or copy to clipboard."
      >
        <Button
          as="a"
          href="#"
          onClick={() => {}}
          rightIcon={<FaExternalLinkAlt />}
        >
          Open in new tab
        </Button>
      </Tooltip>
    </Grid>
  )
}

export default CardActionCors
