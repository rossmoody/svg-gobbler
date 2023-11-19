import { useMemo, useState } from 'react'
import { Button } from 'src/components'
import { useDetails } from 'src/providers'

export const DataURI = () => {
  const [copy, setCopy] = useState('Copy')
  const { state } = useDetails()

  const dataURI = useMemo(() => {
    return `data:image/svg+xml;base64,${btoa(state.currentString)}`
  }, [state.currentString])

  const handleCopy = () => {
    setCopy('Copied')
    navigator.clipboard.writeText(dataURI)
    setTimeout(() => {
      setCopy('Copy')
    }, 1000)
  }

  return (
    <div className="h-full overflow-auto p-4 pb-12">
      <div className="mb-4 flex justify-end">
        <Button size="xs" variant="secondary" onClick={handleCopy}>
          {copy}
        </Button>
      </div>
      <pre className="whitespace-pre-wrap break-words">{dataURI}</pre>
    </div>
  )
}
