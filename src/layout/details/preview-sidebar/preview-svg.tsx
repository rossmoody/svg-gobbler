import { Tooltip } from 'src/components'
import { useDetails } from 'src/providers'

export const PreviewSvg = () => {
  const { state, dispatch } = useDetails()

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'set-preview-background', payload: e.target.value })
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
        <Tooltip content="Background color" side="left">
          <input
            type="color"
            className="input-color"
            onChange={handleColorChange}
            defaultValue={state.preview.svg.background}
            value={state.preview.svg.background}
          />
        </Tooltip>
      </div>
    </div>
  )
}
