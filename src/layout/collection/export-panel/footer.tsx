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

      case 'png':
      case 'webp':
      case 'jpeg': {
        FormUtils.copyImageToClipboard(results)
        break
      }
    }

    setTimeout(() => setLabel('Copy to clipboard'), 1500)
  }

  const handleDownload = async () => {
    const results = await processWithExportConfig(collectionState.selected)

    switch (exportState.fileType) {
      case 'svg': {
        FormUtils.downloadSvgContent(results, exportState.filename, exportState.filenamePrefix)
        break
      }

      case 'png':
      case 'webp':
      case 'jpeg': {
        FormUtils.downloadImageContent(
          results,
          exportState.filename,
          exportState.fileType,
          exportState.filenamePrefix,
        )
        break
      }
    }
  }

  const downloadQuantityString =
    collectionState.selected.length > 1 ? ` ${collectionState.selected.length} files` : ''

  return (
    <footer className="flex flex-col gap-2 px-1 pb-6 pt-4">
      {collectionState.selected.length < 2 && (
        <Button className="justify-center transition-all" onClick={handleCopy} variant="secondary">
          {label}
        </Button>
      )}
      <Button className="justify-center" onClick={handleDownload}>
        Download{downloadQuantityString}
      </Button>
    </footer>
  )
}
