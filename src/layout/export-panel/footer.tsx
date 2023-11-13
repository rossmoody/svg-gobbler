import { useState } from 'react'
import { Button } from 'src/components'
import { useCollection, useExport } from 'src/providers'
import { FormUtils } from 'src/utils/form-utils'
import { useExportActions } from './use-export-actions'

export const Footer = () => {
  const [label, setLabel] = useState('Copy to clipboard')
  const { state: collectionState } = useCollection()
  const { state: exportState } = useExport()
  const { processWithExportConfig } = useExportActions()

  const handleCopy = async () => {
    setLabel('Copied')
    const results = (await processWithExportConfig(collectionState.selected))[0]

    switch (exportState.fileType) {
      case 'svg': {
        FormUtils.copyStringToClipboard(results)
        break
      }

      case 'png': {
        FormUtils.copyPngToClipboard(results)
        break
      }
    }

    setTimeout(() => setLabel('Copy to clipboard'), 1500)
  }

  const handleDownload = async () => {
    const results = await processWithExportConfig(collectionState.selected)

    switch (exportState.fileType) {
      case 'svg': {
        FormUtils.downloadSvgContent(results, exportState.filename)
        break
      }

      case 'png': {
        FormUtils.downloadPngContent(results, exportState.filename)
        break
      }
    }
  }

  const downloadQuantityString =
    collectionState.selected.length > 1 ? ` ${collectionState.selected.length} files` : ''

  return (
    <footer className="flex flex-col gap-2 pt-4 pb-6 px-1">
      {collectionState.selected.length < 2 && (
        <Button variant="secondary" className="justify-center" onClick={handleCopy}>
          {label}
        </Button>
      )}
      <Button className="justify-center" onClick={handleDownload}>
        Download{downloadQuantityString}
      </Button>
    </footer>
  )
}
