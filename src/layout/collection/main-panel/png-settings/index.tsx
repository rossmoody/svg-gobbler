import { HelpIcon } from 'src/components'
import { useExport } from 'src/providers'
import { loc } from 'src/utilities/i18n'

import { imageTooltip } from '../webp-settings'

export const PngSettings = () => {
  const { dispatch, state } = useExport()

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: Number(event.target.value), type: 'set-png-size' })
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="group flex items-center gap-1">
          <label className="export-label" htmlFor="size">
            {loc('export_size')}
          </label>
          <HelpIcon content={imageTooltip} />
        </div>
        <input
          className="export-input"
          id="size"
          onChange={handleSizeChange}
          type="text"
          value={state.settings.png.size}
        />
      </div>
    </div>
  )
}
