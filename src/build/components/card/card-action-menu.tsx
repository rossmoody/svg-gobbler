import React from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  IconButton,
  useToast,
} from '@chakra-ui/react'
import {
  FiChevronDown,
  FiCode,
  FiImage,
  FiDownload,
  FiCopy,
} from 'react-icons/fi'

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
    <Menu placement="top" isLazy closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        icon={<FiChevronDown />}
        aria-label="Options"
        borderRadius="md"
      />

      <MenuList width="auto" height="auto">
        <MenuItem
          icon={<FiDownload />}
          onClick={() => setShowOptimizedModal(true)}
        >
          {loc('card_dl_opt')}
        </MenuItem>

        <MenuItem
          icon={<FiCopy />}
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

        <MenuItem icon={<FiImage />} onClick={() => setShowModal(true)}>
          {loc('card_menu_exportPng')}
        </MenuItem>

        <MenuDivider />

        <MenuItem icon={<FiCode />} onClick={() => setShowDrawer(true)}>
          {loc('card_menu_viewCode')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
export default CardActionMenu
