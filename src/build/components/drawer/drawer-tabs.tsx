import React from 'react'
import {
  Box,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'

import { handle } from '../utils/actions'

import { SVGHighlighter } from './syntax-highlighter'

interface DrawerTabsProps {
  svgString: {
    prettySVG: string
    optimizedSVG: string
  }
}

function DrawerTabs({ svgString }: DrawerTabsProps) {
  const { prettySVG, optimizedSVG } = svgString

  return (
    <Tabs colorScheme="red" isFitted>
      <TabList>
        <Tab>Original</Tab>
        <Tab>Optimized</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Box position="relative">
            <Button
              size="xs"
              position="absolute"
              bottom={6}
              right={6}
              onClick={() => handle.copyToClipboard(prettySVG)}
            >
              Copy
            </Button>
            <SVGHighlighter>{prettySVG}</SVGHighlighter>
          </Box>
        </TabPanel>

        <TabPanel>
          <Box position="relative">
            <Button
              size="xs"
              position="absolute"
              bottom={6}
              right={6}
              onClick={() => handle.copyToClipboard(optimizedSVG)}
            >
              Copy
            </Button>
            <SVGHighlighter>{optimizedSVG}</SVGHighlighter>
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export { DrawerTabs }
