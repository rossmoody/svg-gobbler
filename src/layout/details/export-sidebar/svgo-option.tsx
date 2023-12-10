import { useMemo } from 'react'
import { HelpIcon } from 'src/components'
import { SvgoPlugin } from 'src/constants/svgo-plugins'
import { useDetails } from 'src/providers'

type Props = {
  plugin: SvgoPlugin
}

export const SvgoOption = ({ plugin }: Props) => {
  const { dispatch, state } = useDetails()

  const isChecked = useMemo(() => {
    return state.export.svgoConfig.plugins.some((p: SvgoPlugin) => p.name === plugin.name)
  }, [state.export.svgoConfig.plugins, plugin.name])

  const handleOptionChange = () => {
    if (isChecked) {
      dispatch({ payload: plugin, type: 'remove-plugin' })
    } else {
      dispatch({ payload: plugin, type: 'add-plugin' })
    }

    dispatch({ type: 'process-current-string' })
  }

  return (
    <div className="group flex gap-2">
      <input
        checked={isChecked}
        className="checkbox"
        id={plugin.name}
        onChange={handleOptionChange}
        type="checkbox"
      />
      <div>
        <label className="export-label" htmlFor={plugin.name}>
          {plugin.label}
        </label>
      </div>
      <HelpIcon content={plugin.description} />
    </div>
  )
}
