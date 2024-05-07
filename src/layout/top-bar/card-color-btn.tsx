import { PaintBrushIcon } from '@heroicons/react/24/outline'
import { useRef } from 'react'
import { IconButton, Tooltip } from 'src/components'
import { useCollection } from 'src/providers'
import { StorageUtils } from 'src/utils/storage-utils'

export const CardColorButton = () => {
  const { dispatch, state } = useCollection()
  const colorInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    colorInputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: e.target.value, type: 'set-canvas-color' })
    StorageUtils.setStorageData('view', { ...state.view, canvas: e.target.value })
  }

  return (
    <Tooltip content="Canvas color">
      <IconButton onClick={handleClick} size="lg" variant="ghost">
        <input
          className="sr-only"
          onChange={handleChange}
          ref={colorInputRef}
          type="color"
          value={state.view.canvas}
        />
        <PaintBrushIcon aria-hidden="true" className="h-5 w-5" />
        <span className="sr-only">Change canvas color</span>
      </IconButton>
    </Tooltip>
  )
}
