import { useState } from 'react'
import { Button } from 'src/components'
import { loc } from 'src/utils/i18n'

import { type CardData } from '..'
import { useCardActions } from './use-card-actions'

export const CardCopy = ({ data }: CardData) => {
  const [label, setLabel] = useState(loc('main_copy'))
  const { copyOptimized } = useCardActions(data)

  function handleCopy() {
    setLabel(loc('export_copied'))
    copyOptimized()
    setTimeout(() => {
      setLabel(loc('main_copy'))
    }, 1200)
  }

  return (
    <div className="absolute bottom-4 left-4 right-4 z-10 opacity-0 transition-all duration-300 ease-in-out group-hover/card:opacity-100">
      <Button
        className="w-full justify-center bg-white dark:bg-gray-800/90"
        onClick={handleCopy}
        size="sm"
        variant="secondary"
      >
        {label}
      </Button>
    </div>
  )
}
