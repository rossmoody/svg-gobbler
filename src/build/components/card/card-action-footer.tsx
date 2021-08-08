import React, { useState } from 'react'
import {
  Button,
  Grid,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  IconButton,
  MenuDivider,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import {
  FiChevronDown,
  FiCode,
  FiImage,
  FiDownload,
  FiCopy,
} from 'react-icons/fi'

import Drawer from '../drawer'
import handle from '../utils/actions'

import ImageModal from './image-modal'
import FilenameModal from './filename-modal'

interface CardActionFooter {
  svgString: string
  height: number
  width: number
}

const CardActionFooter = ({ svgString, height, width }: CardActionFooter) => {
  const [showModal, setShowModal] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)
  const [showOgModal, setShowOgModal] = useState(false)
  const [showOptimizedModal, setShowOptimizedModal] = useState(false)

  const toast = useToast({
    status: 'success',
    duration: 3000,
    isClosable: true,
  })

  return (
    <Grid
      position="absolute"
      templateColumns="3fr 2fr 1fr"
      gap={1}
      top="12px"
      bottom={0}
      left={0}
      right={0}
      bg={useColorModeValue('white', 'gray.700')}
    >
      <Button onClick={() => setShowOgModal(true)}>Download</Button>
      {showOgModal && (
        <FilenameModal
          title="Download original"
          download={handle.downloadOriginal}
          svgString={svgString}
          callback={setShowOgModal}
        />
      )}

      <Button
        onClick={() => {
          handle.copyToClipboard(svgString)
          toast({
            title: 'Copied to clipboard',
            description:
              'The SVG has been copied to your clipboard and is ready to be pasted.',
          })
        }}
      >
        Copy
      </Button>

      <Menu placement="top">
        <MenuButton
          as={IconButton}
          icon={<FiChevronDown />}
          aria-label="Options"
          borderRadius="md"
        />
        <MenuList>
          <MenuItem
            icon={<FiDownload />}
            onClick={() => setShowOptimizedModal(true)}
          >
            Download optimized
          </MenuItem>
          {showOptimizedModal && (
            <FilenameModal
              title="Download optimized"
              download={handle.downloadOptimized}
              svgString={svgString}
              callback={setShowOptimizedModal}
            />
          )}

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

          {showModal && (
            <ImageModal
              callback={setShowModal}
              svgString={svgString}
              height={height}
              width={width}
            />
          )}
          <MenuDivider />
          <MenuItem icon={<FiCode />} onClick={() => setShowDrawer(true)}>
            View code…
          </MenuItem>
          {showDrawer && (
            <Drawer svgString={svgString} callback={setShowDrawer} />
          )}
        </MenuList>
      </Menu>
    </Grid>
  )
}

export default CardActionFooter
