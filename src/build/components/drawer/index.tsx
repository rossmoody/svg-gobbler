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

interface CodeDrawer {
  callback: React.Dispatch<React.SetStateAction<boolean>>
  svgString: string
  showDrawer: boolean
}

function CodeDrawer({ callback, svgString, showDrawer }: CodeDrawer) {
  return (
    <Drawer
      isOpen={showDrawer}
      placement="right"
      size="2xl"
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
