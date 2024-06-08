import { Tooltip } from 'src/components'
import { useDetails } from 'src/providers'
import { loc } from 'src/utils/i18n'

export const PreviewSvgFooter = () => {
  const { dispatch, state } = useDetails()

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: e.target.value, type: 'set-preview-background' })
  }

  return (
    <div className="border-t border-gray-200 p-2 dark:border-gray-800">
      <Tooltip content={loc('details_background_color')} side="left">
        <input
          className="input-color"
          onChange={handleColorChange}
          type="color"
          value={state.preview.svg.background}
        />
      </Tooltip>
    </div>
  )
}
