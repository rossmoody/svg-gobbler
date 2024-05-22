import { Tooltip } from 'src/components'
import { useDetails } from 'src/providers'
import { loc } from 'src/utils/i18n'

export const PreviewSvg = () => {
  const { dispatch, state } = useDetails()

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: e.target.value, type: 'set-preview-background' })
  }

  return (
    <div
      className="relative h-full overflow-hidden"
      style={{ background: state.preview.svg.background }}
    >
      <div
        className="flex h-full items-center justify-center p-8"
        dangerouslySetInnerHTML={{ __html: state.currentString }}
      />
      <div className="absolute bottom-6 left-6 right-6 flex justify-end">
        <Tooltip content={loc('details_background_color')} side="left">
          <input
            className="input-color"
            onChange={handleColorChange}
            type="color"
            value={state.preview.svg.background}
          />
        </Tooltip>
      </div>
    </div>
  )
}
