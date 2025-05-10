import { json } from '@codemirror/lang-json'
import { CodeBracketIcon } from '@heroicons/react/24/outline'
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm'
import CodeMirror, { EditorView } from '@uiw/react-codemirror'
import { useState } from 'react'
import { Button, Modal } from 'src/components'
import { logger } from 'src/utilities/logger'
import { StorageUtilities } from 'src/utilities/storage-utilities'

export const DebugData = () => {
  const [debugData, setDebugData] = useState('')
  const [open, setOpen] = useState(false)

  function onClose() {
    setOpen(false)
  }

  function onOpen() {
    StorageUtilities.getStorageData('debug-data')
      .then((data) => {
        setDebugData(JSON.stringify(data, undefined, 2))
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
          <CodeMirror
            basicSetup={{
              closeBrackets: true,
              foldGutter: true,
              lineNumbers: true,
            }}
            className="h-full"
            extensions={[json(), EditorView.lineWrapping]}
            theme={tokyoNightStorm}
            value={debugData}
          />
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
