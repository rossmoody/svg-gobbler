import { Button, HStack, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Copy, Download, Plus } from 'react-feather'
import { useData } from 'src/build/providers/data-provider'
import PasteModal from '../modals/paste-modal'
import handle from '../utils/actions'
import loc from '../utils/localization'
import { util } from '../utils/upload'
import { Location } from './location'
import ThemeToggle from './theme-toggle'
import { ToolbarFrame } from './toolbar-frame'

const DataToolbar = () => {
  const { data, setData } = useData()
  const [showModal, setShowModal] = useState(false)

  const moreThanOneString = util.getSvgStrings(data).length > 1

  return (
    <ToolbarFrame>
      <Location data={data} />
      <HStack
        justify="flex-end"
        flex="1"
        w={{ base: 'full', md: 'auto' }}
        spacing={{ base: '2', md: '4' }}
      >
        <Input
          multiple
          type="file"
          id="upload"
          display="none"
          accept="image/svg+xml"
          onChange={(event) => {
            util.handleUpload(event).then((result) => {
              setData((prevData) => {
                if (prevData instanceof Array) {
                  const newArray = [...prevData]
                  newArray[0].unshift(...result)
                  return newArray
                } else {
                  return [result]
                }
              })
            })
          }}
        />
        <Button
          leftIcon={<Plus size={24} />}
          size="lg"
          onClick={util.handleUploadClick}
        >
          {loc('toolbar_upload')}
        </Button>
        <Button
          leftIcon={<Copy size={24} />}
          size="lg"
          onClick={() => setShowModal(true)}
        >
          {loc('toolbar_paste')}
        </Button>
        {moreThanOneString && (
          <Button
            leftIcon={<Download size={24} />}
            size="lg"
            colorScheme="red"
            onClick={() => handle.downloadAllSVGs(util.getSvgStrings(data))}
          >
            {loc('toolbar_download')}
          </Button>
        )}
        <ThemeToggle />
      </HStack>
      <PasteModal callback={setShowModal} showModal={showModal} />
    </ToolbarFrame>
  )
}

export default DataToolbar
