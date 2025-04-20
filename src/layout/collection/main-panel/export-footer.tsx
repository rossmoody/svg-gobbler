import { useState } from 'react'
import { Button } from 'src/components'
import { useCollection, useExport } from 'src/providers'
import { formUtilities } from 'src/utilities/form-utilities'
import { loc } from 'src/utilities/i18n'

import { ExportSvg, useExportActions } from '../../../hooks/use-export-actions'

export const ExportFooter = () => {
  const [loading, setLoading] = useState(false)
  const [label, setLabel] = useState(loc('export_copy_clipboard'))
  const { state: collectionState } = useCollection()
  const { state: exportState } = useExport()
  const { processWithExportConfig } = useExportActions()

  const handleCopy = async () => {
    setLabel(loc('export_copied'))
    const processed = await processWithExportConfig(collectionState.selected)
    const payload = processed[0].payload

    switch (exportState.fileType) {
      case 'jpeg':
      case 'png':
      case 'webp': {
        formUtilities.copyImageToClipboard(payload)
        break
      }
      case 'svg': {
        formUtilities.copyStringToClipboard(payload)
        break
      }
    }

    setTimeout(() => setLabel(loc('export_copy_clipboard')), 1500)
  }

  const handleDownload = async () => {
    setLoading(true)
    let exportSvgs: ExportSvg[] = await processWithExportConfig(collectionState.selected)

    switch (exportState.fileType) {
      case 'jpeg':
      case 'png':
      case 'webp': {
        await formUtilities.downloadImageContent(exportSvgs, exportState)
        break
      }
      case 'sprite': {
        exportSvgs = collectionState.selected.map((svg) => {
          return {
            name: svg.name,
            payload: svg.svg,
          }
        })
        await formUtilities.downloadSpriteZip(exportSvgs, exportState)
        break
      }

      case 'svg': {
        await formUtilities.downloadSvgContent(exportSvgs, exportState)
        break
      }
    }

    setLoading(false)
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
      <Button className="justify-center" loading={loading} onClick={handleDownload}>
        {buttonLabel}
      </Button>
    </footer>
  )
}
