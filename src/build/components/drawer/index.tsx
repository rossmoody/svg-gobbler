import {
  Divider,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react'
import React from 'react'
import loc from '../utils/localization'
import { DrawerContent as DrawerCodeContent } from './drawer-content'

interface CodeDrawer {
  callback: React.Dispatch<React.SetStateAction<boolean>>
  svgString: string
  showDrawer: boolean
}

const CodeDrawer = ({ callback, svgString, showDrawer }: CodeDrawer) => (
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
      <DrawerHeader>{loc('drawer_details')}</DrawerHeader>
      <Divider />
      <DrawerCodeContent svgString={svgString} />
    </DrawerContent>
  </Drawer>
)

export default CodeDrawer
