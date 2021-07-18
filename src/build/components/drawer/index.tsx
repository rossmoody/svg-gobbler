import React from 'react'
import {
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
} from '@chakra-ui/react'

import { DrawerContent as DrawerCodeContent } from './drawer-content'

function CodeDrawer({
  callback,
  svgString,
}: {
  callback: any
  svgString: string
}) {
  return (
    <Drawer
      isOpen
      placement="right"
      size="xl"
      onClose={() => {
        callback(false)
      }}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Code details</DrawerHeader>
        <Divider />
        <DrawerCodeContent svgString={svgString} />
      </DrawerContent>
    </Drawer>
  )
}

export default CodeDrawer
