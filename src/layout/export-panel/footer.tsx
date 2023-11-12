import { useState } from 'react'
import { Button } from 'src/components'
import { useCollection } from 'src/providers'
import { FormUtils } from 'src/utils/form-utils'
import { useExportActions } from './use-export-actions'

export const Footer = () => {
  const [label, setLabel] = useState('Copy to clipboard')
  const { state } = useCollection()
  const { processWithExportConfig } = useExportActions()

  const handleCopy = () => {
    setLabel('Copied')
    const optimized = processWithExportConfig(state.selected)[0]
    FormUtils.copyToClipboard(optimized)
    setTimeout(() => setLabel('Copy to clipboard'), 1500)
  }

  const handleDownload = () => {
    const optimized = processWithExportConfig(state.selected)
    FormUtils.downloadSvgContent(optimized)
  }

  const downloadQuantityString = state.selected.length > 1 ? ` ${state.selected.length} files` : ''

  return (
    <footer className="flex flex-col gap-2">
      {state.selected.length < 2 && (
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
