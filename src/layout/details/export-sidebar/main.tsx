import _ from 'lodash'
import { svgoPlugins } from 'src/data/svgo-plugins'
import { useDetails } from 'src/providers'
import { ResetButton } from './reset-button'
import { SvgoOption } from './svgo-option'

export const ExportDetailMain = () => {
  const { state, dispatch } = useDetails()

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'update-export-filename', payload: e.target.value })
  }

  return (
    <div className="mb-3">
      <div className="mb-5">
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
      <h2 className="my-3 text-sm font-medium">Settings</h2>
      <div className="mb-5 flex gap-2">
        <input type="checkbox" className="checkbox" id="minify" />
        <div>
          <label htmlFor="minify" className="export-label">
            Minify output
          </label>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="my-3 text-sm font-medium">SVGO Plugins</h2>
        <ResetButton />
      </div>
      <div className="flex flex-col gap-3 pb-8">
        {_.sortBy(svgoPlugins, 'label').map((plugin) => (
          <SvgoOption key={plugin.name} plugin={plugin} />
        ))}
      </div>
    </div>
  )
}
