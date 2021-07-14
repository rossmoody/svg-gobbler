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
} from '@chakra-ui/react'

function CodeDrawer({
  callback,
  svgString,
}: {
  callback: any
  svgString: string
}) {
  return (
    <Drawer isOpen placement="right" onClose={() => callback(false)}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>SVG Code Details</DrawerHeader>

        <DrawerBody>{svgString}</DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={() => callback(false)}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={() => callback(false)}>
            Done
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default CodeDrawer
