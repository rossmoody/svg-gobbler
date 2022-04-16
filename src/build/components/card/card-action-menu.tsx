import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react'
import React from 'react'
import { ChevronDown, Clipboard, Code, Download, Image } from 'react-feather'
import handle from '../utils/actions'
import loc from '../utils/localization'

interface CardActionMenu {
  setShowOptimizedModal: any
  setShowDrawer: any
  svgString: any
  setShowModal: any
}

const CardActionMenu = ({
  setShowOptimizedModal,
  setShowDrawer,
  svgString,
  setShowModal,
}: CardActionMenu) => {
  const toast = useToast({
    status: 'success',
    duration: 3000,
    isClosable: true,
  })

  return (
    <Menu placement="top" isLazy>
      <MenuButton
        as={IconButton}
        icon={<ChevronDown />}
        aria-label="Options"
        borderRadius="md"
      />

      <MenuList width="auto" height="auto" zIndex={100}>
        <MenuItem
          icon={<Download />}
          onClick={() => setShowOptimizedModal(true)}
        >
          {loc('card_dl_opt')}
        </MenuItem>

        <MenuItem
          icon={<Clipboard />}
          onClick={() => {
            handle.copyOptimized(svgString)
            toast({
              title: loc('card_menu_toast_optTitle'),
              description: loc('card_menu_toast_optDesc'),
            })
          }}
        >
          {loc('card_menu_copy_opt')}
        </MenuItem>

        <MenuDivider />

        <MenuItem icon={<Image />} onClick={() => setShowModal(true)}>
          {loc('card_menu_exportPng')}
        </MenuItem>

        <MenuDivider />

        <MenuItem icon={<Code />} onClick={() => setShowDrawer(true)}>
          {loc('card_menu_viewCode')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
export default CardActionMenu
