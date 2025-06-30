import { useState } from 'react'
import { Button } from 'src/components'
import { useCollection, useExport } from 'src/providers'
import { Svg } from 'src/scripts'
import { formUtilities } from 'src/utilities/form-utilities'
import { loc } from 'src/utilities/i18n'
import { StorageUtilities } from 'src/utilities/storage-utilities'
import { SvgUtilities } from 'src/utilities/svg-utilities'

import { ExportSvg, useExportActions } from '../../../hooks/use-export-actions'

export const ExportFooter = () => {
  const [loading, setLoading] = useState(false)
  const { dispatch, state: collectionState } = useCollection()
  const { state: exportState } = useExport()
  const { processWithExportConfig } = useExportActions()

  const handleOptimize = async () => {
    setLoading(true)

    const { collectionId, data, selected } = collectionState
    const optimizedSvgs = await processWithExportConfig(selected)
    const pageData = await StorageUtilities.getPageData(collectionId)

    const newData: Svg[] = data.map((svg) => {
      const selectedSvg = optimizedSvgs.find((s) => s.id === svg.id)
      if (selectedSvg) {
        svg.svg = selectedSvg.payload
        svg.stampLastEdited()
      }
      return svg
    })

    pageData.data = SvgUtilities.createStorageSvgs(newData)
    await StorageUtilities.setPageData(collectionId, pageData)
    dispatch({ payload: newData, type: 'set-data' })
    dispatch({ type: 'process-data' })

    setTimeout(() => {
      setLoading(false)
    }, 400)
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
            id: svg.id,
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

  const downloadButtonLabel =
    exportState.fileType === 'sprite' ? loc('export_download_sprite') : loc('export_export')

  return (
    <footer className="flex shrink-0 flex-col gap-2 border-t border-gray-200 px-4 py-6 dark:border-gray-700">
      {exportState.fileType === 'svg' && (
        <Button
          className="justify-center"
          loading={loading}
          onClick={handleOptimize}
          variant="secondary"
        >
          {loc('optimize')}
        </Button>
      )}
      <Button className="justify-center" loading={loading} onClick={handleDownload}>
        {downloadButtonLabel}
      </Button>
    </footer>
  )
}
