import React from 'react'
import {
  Center,
  Box,
  useColorModeValue,
  Divider,
  SlideFade,
} from '@chakra-ui/react'

import SVGInterface from '../../../find/scripts/svg-class'

import CardFooter from './card-footer'
import CardActions from './card-actions'

interface CardData {
  data: SVGInterface
}

const Card = ({ data }: CardData) => {
  const [showActions, setShowActions] = React.useState(false)

  const { presentationSvg, size, type } = data

  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      rounded="xl"
      shadow="md"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      maxWidth="280px"
    >
      <Center px={8} py={12} minHeight="140px">
        <Box
          position="relative"
          height="0"
          width="100%"
          padding="0 0 100%"
          dangerouslySetInnerHTML={{ __html: presentationSvg! }}
          overflow="hidden"
          sx={{
            '& > svg': {
              position: 'absolute',
              height: '100%',
              width: '100%',
              left: '0',
              top: '0',
              overflow: 'visible',
            },
            '& > img': {
              width: '100%',
            },
          }}
        />
      </Center>
      <Divider mx={5} width="auto" />
      <Box pt={2} pb={4} mx={5} position="relative">
        <SlideFade in={showActions} offsetY="12px">
          <CardActions data={data} />
        </SlideFade>
        <CardFooter size={size!} type={type} />
      </Box>
    </Box>
  )
}

export default Card
