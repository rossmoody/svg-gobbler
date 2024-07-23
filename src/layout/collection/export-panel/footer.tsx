import { useState } from 'react'
import { Button } from 'src/components'
import { useCollection, useExport } from 'src/providers'
import { FormUtils } from 'src/utils/form-utils'
import { loc } from 'src/utils/i18n'

import { useExportActions } from './use-export-actions'

export const Footer = () => {
  const [label, setLabel] = useState(loc('export_copy_clipboard'))
  const { state: collectionState } = useCollection()
  const { state: exportState } = useExport()
  const { processWithExportConfig } = useExportActions()

  const handleCopy = async () => {
    setLabel(loc('export_copied'))
    const payload = (await processWithExportConfig(collectionState.selected))[0].payload

    switch (exportState.fileType) {
      case 'svg': {
        FormUtils.copyStringToClipboard(payload)
        break
      }

      case 'png':
      case 'webp':
      case 'jpeg': {
        FormUtils.copyImageToClipboard(payload)
        break
      }
    }

    setTimeout(() => setLabel(loc('export_copy_clipboard')), 1500)
  }

  const handleDownload = async () => {
    const exportSvgs = await processWithExportConfig(collectionState.selected)

    switch (exportState.fileType) {
      case 'svg': {
        FormUtils.downloadSvgContent(exportSvgs, exportState)
        break
      }

      case 'png':
      case 'webp':
      case 'jpeg': {
        FormUtils.downloadImageContent(exportSvgs, exportState)
        break
      }
    }
  }

  const downloadQuantityString =
    collectionState.selected.length > 1
      ? ` ${collectionState.selected.length} ${loc('export_files')}`
      : ''

  return (
    <footer className="flex flex-col gap-2 px-1 pb-6 pt-4">
      {collectionState.selected.length < 2 && (
        <Button className="justify-center transition-all" onClick={handleCopy} variant="secondary">
          {label}
        </Button>
      )}
      <Button className="justify-center" onClick={handleDownload}>
        {loc('export_download')}
        {downloadQuantityString}
      </Button>
    </footer>
  )
}
