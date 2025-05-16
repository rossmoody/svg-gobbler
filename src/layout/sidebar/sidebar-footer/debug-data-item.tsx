import { CodeBracketIcon } from '@heroicons/react/24/outline'
import JsonView from '@uiw/react-json-view'
import { nordTheme } from '@uiw/react-json-view/nord'
import { useState } from 'react'
import { Button, Modal } from 'src/components'
import { logger } from 'src/utilities/logger'
import { StorageUtilities } from 'src/utilities/storage-utilities'

export const DebugData = () => {
  const [debugData, setDebugData] = useState({})
  const [open, setOpen] = useState(false)

  function onClose() {
    setOpen(false)
  }

  function onOpen() {
    StorageUtilities.getStorageData('debug-data')
      .then((data) => {
        setDebugData(data as object)
        setOpen(true)
      })
      .catch(logger.error)
  }

  return (
    <li>
      <button className="collection-item" onClick={onOpen}>
        <CodeBracketIcon aria-hidden="true" className="h-4 w-4 shrink-0 " />
        Debug Data
      </button>
      <Modal fullScreen open={open} setOpen={setOpen}>
        <Modal.Header>Debug Data</Modal.Header>
        <Modal.Main>
          <JsonView
            collapsed={1}
            displayDataTypes={false}
            enableClipboard={false}
            style={nordTheme}
            value={debugData}
          >
            <JsonView.Quote render={() => <span />} />
          </JsonView>
        </Modal.Main>
        <Modal.Footer>
          <Button onClick={onClose} size="lg">
            Done
          </Button>
          <Button onClick={onClose} size="lg" variant="secondary">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </li>
  )
}
