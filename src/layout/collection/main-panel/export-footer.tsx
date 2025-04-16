import { useState } from 'react'
import { Button } from 'src/components'
import { useCollection, useExport } from 'src/providers'
import { FormUtilities } from 'src/utils/form-utilities'
import { loc } from 'src/utils/i18n'

import { ExportSvg, useExportActions } from './use-export-actions'

export const ExportFooter = () => {
  const [label, setLabel] = useState(loc('export_copy_clipboard'))
  const { state: collectionState } = useCollection()
  const { state: exportState } = useExport()
  const { processWithExportConfig } = useExportActions()

  const handleCopy = async () => {
    setLabel(loc('export_copied'))
    const payload = (await processWithExportConfig(collectionState.selected))[0].payload

    switch (exportState.fileType) {
      case 'jpeg':

      case 'png':
      case 'webp': {
        FormUtilities.copyImageToClipboard(payload)
        break
      }
      case 'svg': {
        FormUtilities.copyStringToClipboard(payload)
        break
      }
    }

    setTimeout(() => setLabel(loc('export_copy_clipboard')), 1500)
  }

  const handleDownload = async () => {
    let exportSvgs: ExportSvg[] = await processWithExportConfig(collectionState.selected)

    switch (exportState.fileType) {
      case 'jpeg':

      case 'png':
      case 'webp': {
        FormUtilities.downloadImageContent(exportSvgs, exportState)
        break
      }
      case 'sprite': {
        exportSvgs = collectionState.selected.map((svg) => {
          return {
            name: svg.name,
            payload: svg.svg,
          }
        })
        FormUtilities.downloadSpriteZip(exportSvgs, exportState)
        break
      }

      case 'svg': {
        FormUtilities.downloadSvgContent(exportSvgs, exportState)
        break
      }
    }
  }

  const downloadQuantityString =
    collectionState.selected.length > 1
      ? ` ${collectionState.selected.length} ${loc('export_files')}`
      : ''

  const buttonLabel =
    exportState.fileType === 'sprite'
      ? loc('export_download_sprite')
      : loc('export_download') + downloadQuantityString

  return (
    <footer className="flex shrink-0 flex-col gap-2 border-t border-gray-200 px-4 py-6 dark:border-gray-700">
      {collectionState.selected.length < 2 && exportState.fileType !== 'sprite' && (
        <Button className="justify-center transition-all" onClick={handleCopy} variant="secondary">
          {label}
        </Button>
      )}
      <Button className="justify-center" onClick={handleDownload}>
        {buttonLabel}
      </Button>
    </footer>
  )
}
