import _ from 'lodash'
import { HelpIcon } from 'src/components'
import { svgoPlugins } from 'src/data/svgo-plugins'
import { useDetails } from 'src/providers'
import { ResetButton } from './reset-button'
import { SvgoOption } from './svgo-option'

export const ExportDetailMain = () => {
  const { state, dispatch } = useDetails()

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'update-export-filename', payload: e.target.value })
    dispatch({ type: 'process-current-string' })
  }

  const handlePrettifyMarkupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'set-prettify', payload: e.target.checked })
    dispatch({ type: 'process-current-string' })
  }

  const handleFloatPrecisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'set-float-precision', payload: Number(e.target.value) })
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
            id="file-name"
            type="text"
            className="export-input"
            onChange={handleFileNameChange}
            value={state.export.filename}
          />
        </div>
        <div>
          <div className="group flex items-center gap-1">
            <label htmlFor="float-precision" className="export-label mb-1">
              Floating precision
            </label>
            <HelpIcon content="Precision of floating point numbers. Will be passed to each plugin that supports this param." />
          </div>
          <input
            id="float-precision"
            type="number"
            min="1"
            max="10"
            value={state.export.svgoConfig.floatPrecision}
            className="input"
            onChange={handleFloatPrecisionChange}
          />
        </div>
        <div className="mt-3 flex gap-2">
          <input
            type="checkbox"
            className="checkbox"
            id="prettify-markup"
            onChange={handlePrettifyMarkupChange}
            checked={state.export.svgoConfig.js2svg?.pretty}
          />
          <label htmlFor="prettify-markup" className="export-label">
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
