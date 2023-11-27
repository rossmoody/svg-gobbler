import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import miniUri from 'mini-svg-data-uri'
import { useMemo } from 'react'
import { Button } from 'src/components'
import { useClipboard } from 'src/hooks'
import { useDetails } from 'src/providers'
import { SvgUtils } from 'src/utils/svg-utils'

export const DataURI = () => {
  const { text, copyToClipboard } = useClipboard()
  const { state } = useDetails()

  const uriData = useMemo(() => {
    return [
      {
        name: 'Minifed Data URI',
        value: miniUri(state.currentString),
      },
      {
        name: 'base64',
        value: 'data:image/svg+xml;base64,' + btoa(state.currentString),
      },
      {
        name: 'encodeURIComponent',
        value: 'data:image/svg+xml,' + encodeURIComponent(state.currentString),
      },
    ]
  }, [state.currentString])

  return (
    <div className="px-4 py-6 transition-all duration-500 ease-in-out">
      {uriData.map((item) => (
        <section key={item.name} className="group mb-6">
          <span className="label">
            {item.name} - <span className="text-muted">{SvgUtils.getPrettyBytes(item.value)}</span>
          </span>
          <div className="relative rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700/50 dark:bg-gray-800/50">
            <Button
              size="xs"
              onClick={() => copyToClipboard(item.value)}
              className="absolute right-4 top-4 opacity-0 shadow-md group-hover:opacity-100"
            >
              <ClipboardDocumentIcon className="h-3 w-3" />
              {text}
            </Button>
            <div className="max-h-52 overflow-y-auto p-5">
              <pre className="whitespace-pre-wrap break-all">{item.value}</pre>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
