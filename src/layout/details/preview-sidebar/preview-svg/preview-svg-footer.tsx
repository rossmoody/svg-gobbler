import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { IconButton, Tooltip } from 'src/components'
import { useDetails } from 'src/providers'
import { loc } from 'src/utilities/i18n'

import { PreviewBackgroundButton } from './preview-background-button'

export const PreviewSvgFooter = () => {
  const { dispatch, state } = useDetails()

  function handleZoomIn() {
    dispatch({ payload: String(state.preview.svg.scale + 0.25), type: 'set-preview-scale' })
  }

  function handleZoomOut() {
    if (state.preview.svg.scale <= 0.1) return
    dispatch({ payload: String(state.preview.svg.scale - 0.25), type: 'set-preview-scale' })
  }

  const scalePercentage = Math.round(state.preview.svg.scale * 100)

  return (
    <div className="border-t border-gray-200 px-4 py-3 dark:border-gray-800">
      <div className="flex justify-between">
        <section className="flex items-center gap-2">
          <Tooltip content={loc('zoom_out')}>
            <IconButton onClick={handleZoomOut} variant="secondary">
              <MinusIcon className="h-4 w-4" />
            </IconButton>
          </Tooltip>
          {scalePercentage}%
          <Tooltip content={loc('zoom_in')}>
            <IconButton onClick={handleZoomIn} variant="secondary">
              <PlusIcon className="h-4 w-4" />
            </IconButton>
          </Tooltip>
        </section>
        <section className="flex items-center gap-2">
          <PreviewBackgroundButton type="white" />
          <PreviewBackgroundButton type="black" />
          <PreviewBackgroundButton type="gray" />
          <PreviewBackgroundButton type="transparent" />
        </section>
      </div>
    </div>
  )
}
