import {
  Box,
  Center,
  Divider,
  ScaleFade,
  SlideFade,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import SVG from '../../../process/SVG'
import CardActions from './card-actions'
import CardFooter from './card-footer'

type Props = {
  data: SVG
}

const Card = ({ data }: Props) => {
  const [showActions, setShowActions] = useState(false)

  const cardFillBg = useColorModeValue('white', 'gray.700')
  const whiteFillBg = useColorModeValue('gray.200', 'null')

  const handleHoverAndFocus = () => {
    if (showActions) return
    setShowActions(true)
  }

  return (
    <ScaleFade in initialScale={0.9}>
      <Box
        bg={cardFillBg}
        rounded="xl"
        shadow="md"
        onFocus={handleHoverAndFocus}
        onMouseEnter={handleHoverAndFocus}
        onMouseLeave={() => setShowActions(false)}
        maxWidth="280px"
      >
        <Center px={8} py={12} minHeight="140px" position="relative">
          <Box
            position="relative"
            height="0"
            width="100%"
            padding="0 0 100%"
            dangerouslySetInnerHTML={{ __html: data.presentationSvg }}
            overflow="hidden"
            zIndex={1}
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
          {data.containsWhiteFill && (
            <Box
              bg={whiteFillBg}
              borderRadius="lg"
              position="absolute"
              width="90%"
              height="90%"
            />
          )}
        </Center>
        <Divider mx={5} width="auto" />
        <Box pt={2} pb={4} mx={5} position="relative">
          <SlideFade in={showActions} offsetY="12px">
            <CardActions data={data} />
          </SlideFade>
          <CardFooter data={data} />
        </Box>
      </Box>
    </ScaleFade>
  )
}

export default Card
