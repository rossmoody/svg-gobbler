import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { useMemo } from 'react'
import { Tooltip } from 'src/components'
import { SvgoPlugin } from 'src/data/svgo-plugins'
import { useDetails } from 'src/providers'

type Props = {
  plugin: SvgoPlugin
}

export const SvgoOption = ({ plugin }: Props) => {
  const { state, dispatch } = useDetails()

  const isChecked = useMemo(() => {
    return state.export.svgoConfig.plugins.some((p: SvgoPlugin) => p.name === plugin.name)
  }, [state.export.svgoConfig.plugins, plugin.name])

  const handleOptionChange = () => {
    if (isChecked) {
      dispatch({ type: 'remove-plugin', payload: plugin })
    } else {
      dispatch({ type: 'add-plugin', payload: plugin })
    }
  }

  return (
    <div className="group flex gap-2">
      <input
        type="checkbox"
        className="checkbox"
        id={plugin.name}
        checked={isChecked}
        onChange={handleOptionChange}
      />
      <div>
        <label htmlFor={plugin.name} className="export-label">
          {plugin.label}
        </label>
      </div>
      <Tooltip content={plugin.description}>
        <QuestionMarkCircleIcon className="text-muted h-4 w-4 cursor-help opacity-0 transition-opacity ease-in group-hover:opacity-100" />
      </Tooltip>
    </div>
  )
}
