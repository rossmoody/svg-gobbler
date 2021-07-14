import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Divider,
} from '@chakra-ui/react'

import { DrawerTabs } from './drawer-tabs'
import { prettifySvg, optimizeSvg } from './process-strings'

function CodeDrawer({
  callback,
  svgString,
}: {
  callback: any
  svgString: string
}) {
  const processedSVGString = {
    prettySVG: prettifySvg(svgString),
    optimizedSVG: optimizeSvg(svgString),
  }

  return (
    <Drawer isOpen placement="right" size="lg" onClose={() => callback(false)}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>SVG Markup</DrawerHeader>
        <Divider />

        <DrawerBody>
          <DrawerTabs svgString={processedSVGString} />
        </DrawerBody>

        <DrawerFooter>
          <Button colorScheme="red" onClick={() => callback(false)}>
            Done
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default CodeDrawer
