import { HelpIcon } from 'src/components'
import { useExport } from 'src/providers'
import { imageTooltip } from '../webp-settings'

export const PngSettings = () => {
  const { state, dispatch } = useExport()

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'set-png-size', payload: Number(e.target.value) })
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
    </div>
  )
}
