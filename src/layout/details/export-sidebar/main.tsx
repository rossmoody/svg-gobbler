import _ from 'lodash'
import { HelpIcon } from 'src/components'
import { svgoPlugins } from 'src/constants/svgo-plugins'
import { useDetails } from 'src/providers'
import { loc } from 'src/utilities/i18n'

import { ApplyButton } from './apply-button'
import { SvgoOption } from './svgo-option'

export const ExportDetailMain = () => {
  const { dispatch, state } = useDetails()

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: event.target.value, type: 'update-name' })
    dispatch({ type: 'process-current-string' })
  }

  const handlePrettifyMarkupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: event.target.checked, type: 'set-prettify' })
    dispatch({ type: 'process-current-string' })
  }

  const handleFloatPrecisionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: Number(event.target.value), type: 'set-float-precision' })
    dispatch({ type: 'process-current-string' })
  }

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div>
          <label className="export-label" htmlFor="name">
            {loc('name')}
          </label>
          <input
            className="export-input"
            id="name"
            onChange={handleNameChange}
            type="text"
            value={state.name}
          />
        </div>
        <div>
          <div className="group mb-1 flex items-center gap-1">
            <label className="export-label" htmlFor="float-precision">
              {loc('export_floating')}
            </label>
            <HelpIcon content={loc('details_floating_tooltip')} />
          </div>
          <input
            className="input"
            id="float-precision"
            max="10"
            min="1"
            onChange={handleFloatPrecisionChange}
            type="number"
            value={state.export.svgoConfig.floatPrecision}
          />
        </div>
        <div className="mt-3 flex gap-2">
          <input
            checked={state.export.svgoConfig.js2svg?.pretty}
            className="checkbox"
            id="prettify-markup"
            onChange={handlePrettifyMarkupChange}
            type="checkbox"
          />
          <label className="export-label" htmlFor="prettify-markup">
            {loc('export_pretty')}
          </label>
        </div>
      </div>

      {/* Plugins */}
      <div className="mt-5 flex items-center justify-between">
        <h2 className="text-sm font-medium">{loc('details_plugin')}</h2>
        <ApplyButton />
      </div>
      <div className="mt-4 flex flex-col gap-3 pb-8">
        {_.sortBy(svgoPlugins, 'label').map((plugin) => (
          <SvgoOption key={plugin.name} plugin={plugin} />
        ))}
      </div>
    </div>
  )
}
