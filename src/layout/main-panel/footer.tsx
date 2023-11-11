import { useState } from 'react'
import { Button } from 'src/components'
import { useCollection } from 'src/providers'
import { FormUtils } from 'src/utils/form-utils'

export const Footer = () => {
  const [label, setLabel] = useState('Copy to clipboard')
  const { state } = useCollection()

  const handleCopy = () => {
    setLabel('Copied')
    FormUtils.copyToClipboard(state.selected[0].originalString)
    setTimeout(() => setLabel('Copy to clipboard'), 1000)
  }

  return (
    <footer className="flex flex-col gap-2">
      {state.selected.length < 2 && (
        <Button variant="secondary" className="justify-center" onClick={handleCopy}>
          {label}
        </Button>
      )}
      <Button className="justify-center">Download</Button>
    </footer>
  )
}
