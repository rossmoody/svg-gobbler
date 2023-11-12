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

  const handleCopy = () => {
    setLabel('Copied')
    const optimized = processWithExportConfig(collectionState.selected)[0]
    FormUtils.copyToClipboard(optimized)
    setTimeout(() => setLabel('Copy to clipboard'), 1500)
  }

  const handleDownload = () => {
    const results = processWithExportConfig(collectionState.selected)
    console.log(results, 'results')
    FormUtils.downloadSvgContent(results, exportState.filename)
  }

  const downloadQuantityString =
    collectionState.selected.length > 1 ? ` ${collectionState.selected.length} files` : ''

  return (
    <footer className="flex flex-col gap-2">
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
