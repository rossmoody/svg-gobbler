import clsx from 'clsx'
import { btnBaseStyles, Tooltip } from 'src/components'
import { PreviewBackgroundClass, useDetails } from 'src/providers'
import { loc } from 'src/utilities/i18n'

type PreviewBackgroundButtonProperties = {
  type: PreviewBackgroundClass
}

export const PreviewBackgroundButton = ({ type }: PreviewBackgroundButtonProperties) => {
  const { dispatch, state } = useDetails()

  const handleBackgroundChange = () => {
    dispatch({ payload: type, type: 'set-preview-background' })
  }

  const ringStyle =
    state.preview.svg.background === type ? 'ring-red-500' : 'ring-gray-300 dark:ring-gray-700'

  return (
    <Tooltip content={loc('details_background_color')}>
      <button
        className={clsx('h-6 w-6 ring-1', type, btnBaseStyles, ringStyle)}
        onClick={handleBackgroundChange}
      />
    </Tooltip>
  )
}

export default PreviewBackgroundButton
