import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import miniUri from 'mini-svg-data-uri'
import prettyBytes from 'pretty-bytes'
import { useMemo, useState } from 'react'
import { Button } from 'src/components'
import { useDetails } from 'src/providers'

export const DataURI = () => {
  const [copy, setCopy] = useState('Copy')
  const { state } = useDetails()

  const uriData = useMemo(() => {
    return {
      ['Minified data URI']: miniUri(state.currentString),
      base64: 'data:image/svg+xml;base64,' + btoa(state.currentString),
      encodeURI: 'data:image/svg+xml,' + encodeURIComponent(state.currentString),
    }
  }, [state.currentString])

  const getPrettyBytes = (string: string) => {
    return prettyBytes(new Blob([string]).size)
  }

  const handleCopy = (string: string) => {
    setCopy('Copied')
    navigator.clipboard.writeText(string)
    setTimeout(() => setCopy('Copy'), 1000)
  }

  return (
    <div className="h-full overflow-auto px-4 pb-12 pt-6 transition-all duration-500 ease-in-out">
      {Object.entries(uriData).map(([key, value]) => (
        <section key={key} className="group mb-6">
          <span className="label pb-1">
            {key} - <span className="text-muted">{getPrettyBytes(value)}</span>
          </span>
          <div className="relative rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/70">
            <Button
              size="xs"
              onClick={() => handleCopy(value)}
              className="absolute right-4 top-4 opacity-0 shadow-md group-hover:opacity-100"
            >
              <ClipboardDocumentIcon className="h-3 w-3" />
              {copy}
            </Button>
            <pre className="whitespace-pre-wrap break-all">{value}</pre>
          </div>
        </section>
      ))}
    </div>
  )
}
