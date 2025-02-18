import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useRef } from 'react'
import { useDatabase } from 'src/hooks'
import { loc } from 'src/utils/i18n'

import { Button } from '.'

export const ErrorState = () => {
  const sendMessage = useDatabase('error')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const refresh = () => {
    window.location.reload()
  }

  const sendMessageHandler = () => {
    sendMessage(textAreaRef.current?.value ?? 'No error message')
    refresh()
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-12">
      <div className="w-full max-w-lg">
        <div className="text-center">
          <ExclamationTriangleIcon
            aria-hidden={true}
            className="mx-auto h-12 w-12 text-gray-600 dark:text-gray-400"
          />
          <h3 className="mt-3 text-lg font-semibold">{loc('error_title')}</h3>
          <p className="mt-1 text-sm">{loc('error_desc')}</p>
          <label className="sr-only" htmlFor="error-input">
            {loc('error_input_label')}
          </label>
          <textarea autoFocus className="input mt-6 h-32" id="error-input" ref={textAreaRef} />
          <div className="mt-6 flex justify-center gap-2">
            <Button className="flex-1" onClick={refresh} size="lg" variant="secondary">
              {loc('error_action')}
            </Button>
            <Button className="flex-1 text-center" onClick={sendMessageHandler} size="lg">
              {loc('error_primary_action')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
