import React from 'react'
import { Box, Center, Flex } from '@chakra-ui/react'

import { SVGHighlighter } from './syntax-highlighter'
import { prettifySvg, optimizeSvg } from './process-strings'
import { SVGOSwitches } from './svgo-switches'

function CodeView({ svgString }: { svgString: string }) {
  const processedSVGString = {
    prettySVG: prettifySvg(svgString),
    optimizedSVG: optimizeSvg(svgString),
  }

  return (
    <Flex>
      <Flex
        flex={6}
        flexDir="column"
        maxW="50vw"
        overflow="auto"
        maxHeight="100vh"
        minHeight="100vh"
      >
        <Box bg="rgb(40, 42, 54)" p={2} flex={1}>
          Actions for the code will go here
        </Box>
        <SVGHighlighter>{processedSVGString.prettySVG}</SVGHighlighter>
      </Flex>
      <Flex flex={4} flexDir="column">
        <Center minHeight="200px" bg="tomato" marginBottom={2}>
          SVG preview will go here
        </Center>
        <Box position="relative" width="100%" height="100%" overflow="auto">
          <SVGOSwitches />
        </Box>
      </Flex>
    </Flex>
  )
}

export { CodeView }
