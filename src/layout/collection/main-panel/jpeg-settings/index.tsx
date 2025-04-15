import { HelpIcon } from 'src/components'
import { useExport } from 'src/providers'
import { loc } from 'src/utils/i18n'

import { imageTooltip } from '../webp-settings'

export const JpegSettings = () => {
  const { dispatch, state } = useExport()

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: Number(e.target.value), type: 'set-jpeg-size' })
  }

  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: Number(e.target.value), type: 'set-jpeg-quality' })
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
      <div>
        <label className="export-label" htmlFor="quality">
          {loc('export_quality')}
        </label>
        <input
          className="export-input"
          id="quality"
          max={1}
          min={0}
          onChange={handleQualityChange}
          step={0.01}
          type="number"
          value={state.settings.jpeg.quality}
        />
      </div>
    </div>
  )
}
