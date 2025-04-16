import { useMemo } from 'react'
import { HelpIcon } from 'src/components'
import { SvgoPlugin } from 'src/constants/svgo-plugins'
import { useExport } from 'src/providers'

type SvgoOptionProperties = {
  plugin: SvgoPlugin
}

export const SvgoOption = ({ plugin }: SvgoOptionProperties) => {
  const { dispatch, state } = useExport()

  const isChecked = useMemo(() => {
    return state.settings.svg.svgoPlugins.some((p) => p.name === plugin.name)
  }, [state.settings.svg.svgoPlugins, plugin])

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.checked) {
      case false: {
        dispatch({ payload: plugin, type: 'remove-svgo-plugin' })
        break
      }

      case true: {
        dispatch({ payload: plugin, type: 'add-svgo-plugin' })
        break
      }
    }
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
