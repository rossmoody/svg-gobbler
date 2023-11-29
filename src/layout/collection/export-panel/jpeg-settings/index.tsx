import { HelpIcon } from 'src/components'
import { useExport } from 'src/providers'
import { imageTooltip } from '../webp-settings'

export const JpegSettings = () => {
  const { state, dispatch } = useExport()

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'set-jpeg-size', payload: Number(e.target.value) })
  }

  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'set-jpeg-quality', payload: Number(e.target.value) })
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="group flex items-center gap-1">
          <label className="export-label" htmlFor="size">
            Size
          </label>
          <HelpIcon content={imageTooltip} />
        </div>
        <input
          type="text"
          className="export-input"
          id="size"
          value={state.settings.png.size}
          onChange={handleSizeChange}
        />
      </div>
      <div>
        <label className="export-label" htmlFor="quality">
          Quality
        </label>
        <input
          type="number"
          className="export-input"
          id="quality"
          min={0}
          max={1}
          step={0.01}
          value={state.settings.jpeg.quality}
          onChange={handleQualityChange}
        />
      </div>
    </div>
  )
}
