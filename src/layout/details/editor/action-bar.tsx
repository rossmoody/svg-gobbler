import { ArrowRightIcon, BoltIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useMemo } from 'react'
import { useDetails } from 'src/providers'
import { loc } from 'src/utils/i18n'
import { SvgUtilities } from 'src/utils/svg-utilities'

import { useOptimize } from '../use-optimize'

export const ActionBar = () => {
  const { dispatch, state } = useDetails()
  const { format, optimize } = useOptimize()

  const onOptimize = () => {
    dispatch({ payload: optimize(state.currentString), type: 'update-current-string' })
  }

  const onFormat = () => {
    const formatted = format(state.currentString)
    dispatch({ payload: formatted, type: 'update-current-string' })
  }

  const bytes = useMemo(() => {
    return {
      after: SvgUtilities.getPrettyBytes(state.currentString),
      before: SvgUtilities.getPrettyBytes(state.originalString),
    }
  }, [state.currentString, state.originalString])

  return (
    <div className="flex h-14 items-center justify-between bg-[#24283b] px-4 text-white">
      <button className="editor-btn" onClick={onOptimize}>
        <BoltIcon className="h-4 w-4 opacity-50" />
        {loc('details_optimize')}
      </button>
      <span className="flex items-center gap-2 text-center">
        {bytes.before} <ArrowRightIcon className="inline h-2.5 w-2.5" /> {bytes.after}
      </span>
      <button className="editor-btn" onClick={onFormat}>
        <SparklesIcon className="h-4 w-4 opacity-50" />
        {loc('details_format')}
      </button>
    </div>
  )
}
