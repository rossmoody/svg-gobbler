import _ from 'lodash'
import { HelpIcon } from 'src/components'
import { svgoPlugins } from 'src/constants/svgo-plugins'
import { useDetails } from 'src/providers'

import { ResetButton } from './reset-button'
import { SvgoOption } from './svgo-option'

export const ExportDetailMain = () => {
  const { dispatch, state } = useDetails()

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: e.target.value, type: 'update-export-filename' })
    dispatch({ type: 'process-current-string' })
  }

  const handlePrettifyMarkupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: e.target.checked, type: 'set-prettify' })
    dispatch({ type: 'process-current-string' })
  }

  const handleFloatPrecisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: Number(e.target.value), type: 'set-float-precision' })
    dispatch({ type: 'process-current-string' })
  }

  return (
    <div>
      {/* Settings */}
      <div className="flex flex-col gap-2">
        <div>
          <label className="export-label" htmlFor="file-name">
            File name
          </label>
          <input
            className="export-input"
            id="file-name"
            onChange={handleFileNameChange}
            type="text"
            value={state.export.filename}
          />
        </div>
        <div>
          <div className="group mb-1 flex items-center gap-1">
            <label className="export-label" htmlFor="float-precision">
              Floating precision
            </label>
            <HelpIcon content="Precision of floating point numbers. Will be passed to each plugin that supports this param." />
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
            Pretty print
          </label>
        </div>
      </div>

      {/* Plugins */}
      <div className="mt-5 flex items-center justify-between">
        <h2 className="text-sm font-medium">Plugins</h2>
        <ResetButton />
      </div>
      <div className="mt-4 flex flex-col gap-3 pb-8">
        {_.sortBy(svgoPlugins, 'label').map((plugin) => (
          <SvgoOption key={plugin.name} plugin={plugin} />
        ))}
      </div>
    </div>
  )
}
