import { useMemo } from 'react'
import { HelpIcon } from 'src/components'
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

    dispatch({ type: 'process-current-string' })
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
      <HelpIcon content={plugin.description} />
    </div>
  )
}
