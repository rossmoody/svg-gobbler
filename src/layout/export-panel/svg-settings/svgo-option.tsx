import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import { useMemo } from 'react'
import { Tooltip } from 'src/components'
import { SvgoPlugin } from 'src/data/svgo-plugins'
import { useExport } from 'src/providers'

type SvgoOptionProps = {
  plugin: SvgoPlugin
}

export const SvgoOption = ({ plugin }: SvgoOptionProps) => {
  const { state, dispatch } = useExport()

  const isChecked = useMemo(() => {
    return state.settings.svg.svgoPlugins.some((p) => p.name === plugin.name)
  }, [state.settings.svg.svgoPlugins, plugin])

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.checked) {
      case true:
        dispatch({ type: 'add-svgo-plugin', payload: plugin })
        break

      case false:
        dispatch({ type: 'remove-svgo-plugin', payload: plugin })
        break
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
        <label htmlFor={plugin.name} className="export-label ">
          {plugin.label}
        </label>
      </div>
      <Tooltip content={plugin.description}>
        <QuestionMarkCircleIcon className="text-muted h-4 w-4 cursor-help opacity-0 transition-opacity ease-in group-hover:opacity-100" />
      </Tooltip>
    </div>
  )
}
