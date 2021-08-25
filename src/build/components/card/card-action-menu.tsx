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
          Download optimized
        </MenuItem>

        <MenuItem
          icon={<FiCopy />}
          onClick={() => {
            handle.copyOptimized(svgString)
            toast({
              title: 'Copied to clipboard',
              description:
                "The SVG has been successfully optimized using SVGO's default settings and is available in your clipboard.",
            })
          }}
        >
          Copy optimized
        </MenuItem>

        <MenuDivider />

        <MenuItem icon={<FiImage />} onClick={() => setShowModal(true)}>
          Export as PNG…
        </MenuItem>

        <MenuDivider />
        <MenuItem icon={<FiCode />} onClick={() => setShowDrawer(true)}>
          View code…
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
export default CardActionMenu
