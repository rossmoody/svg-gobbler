import { Button, Grid, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import SVG from 'src/find/SVG'
import Drawer from '../drawer'
import FilenameModal from '../modals/filename-modal'
import ImageModal from '../modals/image-modal'
import handle from '../utils/actions'
import loc from '../utils/localization'
import CardActionMenu from './card-action-menu'

type Props = {
  data: SVG
}

const CardActionFooter = ({ data }: Props) => {
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
      <Button
        onClick={() => {
          handle.copyToClipboard(data.elementAsString)
          toast({
            title: loc('card_copy_title'),
            description: loc('card_copy_desc'),
          })
        }}
      >
        {loc('card_copy_action')}
      </Button>

      <CardActionMenu
        setShowOptimizedModal={setShowOptimizedModal}
        setShowDrawer={setShowDrawer}
        svgString={data.elementAsString}
        setShowModal={setShowModal}
      />

      <FilenameModal
        title={loc('card_dl_orig')}
        download={handle.downloadOriginal}
        svgString={data.elementAsString}
        callback={setShowOgModal}
        showModal={showOgModal}
      />

      <FilenameModal
        title={loc('card_dl_opt')}
        download={handle.downloadOptimized}
        svgString={data.elementAsString}
        callback={setShowOptimizedModal}
        showModal={showOptimizedModal}
      />

      <Drawer
        svgString={data.elementAsString}
        callback={setShowDrawer}
        showDrawer={showDrawer}
      />

      <ImageModal
        callback={setShowModal}
        svgString={data.elementAsString}
        height={Number(data.height)}
        width={Number(data.width)}
        whiteFill={data.containsWhiteFill}
        showModal={showModal}
      />
    </Grid>
  )
}

export default CardActionFooter
