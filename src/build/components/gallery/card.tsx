import React from 'react'
import CardFooter from './card-footer'
import CardActionFooter from './card-action-footer'
import {
  Center,
  Box,
  useColorModeValue,
  Divider,
  SlideFade,
} from '@chakra-ui/react'
import SVG from '../../../find/scripts/create-svg'
import CardActionCors from './card-action-cors'

interface CardData {
  data: SVG
}

const Card = ({ data }: CardData) => {
  const [showActions, setShowActions] = React.useState(false)

  const { presentationSvg, size, type, svgString, cors } = data

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
          dangerouslySetInnerHTML={{ __html: presentationSvg }}
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
          }}
        />
      </Center>
      <Divider mx={5} width="auto" />
      <Box pt={2} pb={4} mx={5} position="relative">
        <SlideFade in={showActions} offsetY="12px">
          {cors ? (
            <CardActionCors />
          ) : (
            <CardActionFooter svgString={svgString} />
          )}
        </SlideFade>
        <CardFooter size={size} type={type} />
      </Box>
    </Box>
  )
}

export default Card