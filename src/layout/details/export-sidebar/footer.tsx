import { useState } from 'react'
import { Button } from 'src/components'
import { useDetails } from 'src/providers'
import { FormUtils } from 'src/utils/form-utils'

export const ExportDetailFooter = () => {
  const { state } = useDetails()
  const [label, setLabel] = useState('Copy to clipboard')

  const handleCopy = async () => {
    setLabel('Copied')
    await navigator.clipboard.writeText(state.currentString)
    setTimeout(() => setLabel('Copy to clipboard'), 1500)
  }

  const handleDownload = async () => {
    FormUtils.downloadSvgString(state.currentString, state.export.filename)
  }

  return (
    <footer className="flex flex-col gap-2 px-3 pb-6 pt-4">
      <Button variant="secondary" className="justify-center transition-all" onClick={handleCopy}>
        {label}
      </Button>
      <Button className="justify-center" onClick={handleDownload}>
        Download
      </Button>
    </footer>
  )
}
