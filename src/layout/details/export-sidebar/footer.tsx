import { Button } from 'src/components'
import { useClipboard } from 'src/hooks'
import { useDetails } from 'src/providers'
import { FormUtils } from 'src/utils/form-utils'

export const ExportDetailFooter = () => {
  const { state } = useDetails()
  const { copyToClipboard, text } = useClipboard('Copy to clipboard')

  const handleCopy = () => {
    copyToClipboard(state.currentString)
  }

  const handleDownload = async () => {
    FormUtils.downloadSvgString(state.currentString, state.export.filename)
  }

  return (
    <footer className="flex flex-col gap-2 px-3 pb-6 pt-4">
      <Button className="justify-center transition-all" onClick={handleCopy} variant="secondary">
        {text}
      </Button>
      <Button className="justify-center" onClick={handleDownload}>
        Download
      </Button>
    </footer>
  )
}
