import { BoltIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useDetails } from 'src/providers'
import { useOptimize } from './use-optimize'

export const ActionBar = () => {
  const { state, dispatch } = useDetails()
  const { optimize, format } = useOptimize()

  const onOptimize = () => {
    const optimized = optimize(state.currentString)
    dispatch({ type: 'update-current-string', payload: optimized })
  }

  const onFormat = () => {
    const formatted = format(state.currentString)
    dispatch({ type: 'update-current-string', payload: formatted })
  }

  return (
    <div className="flex h-14 items-center justify-between bg-[#24283b] px-4 text-white">
      <button className="editor-btn" onClick={onOptimize}>
        <BoltIcon className="h-4 w-4 opacity-50" />
        Optimize
      </button>
      <span className="text-center">431b to 321b</span>
      <button className="editor-btn" onClick={onFormat}>
        <SparklesIcon className="h-4 w-4 opacity-50" />
        Format
      </button>
    </div>
  )
}
