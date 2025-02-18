import { PaintBrushIcon } from '@heroicons/react/24/outline'
import { merge } from 'lodash'
import { useCallback, useRef } from 'react'
import { IconButton, Tooltip } from 'src/components'
import { useCollection, useUser } from 'src/providers'
import { loc } from 'src/utils/i18n'
import { StorageUtils } from 'src/utils/storage-utils'

import { CardColorOnboarding } from './card-color-onboarding'

export const CardColorButton = () => {
  const { dispatch: userDispatch, state: userState } = useUser()
  const { dispatch, state } = useCollection()
  const colorInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    colorInputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: e.target.value, type: 'set-canvas-color' })
    StorageUtils.setStorageData('view', { ...state.view, canvas: e.target.value })
  }

  const onFocus = useCallback(() => {
    if (!userState.onboarding.viewedCardColor) {
      const newUser = merge(userState, { onboarding: { viewedCardColor: true } })
      userDispatch({ payload: newUser, type: 'set-user' })
      StorageUtils.setStorageData('user', newUser)
    }
  }, [userDispatch, userState])

  return (
    <Tooltip content={loc('topbar_canvas_tooltip')}>
      <IconButton
        className="relative"
        onClick={handleClick}
        onFocus={onFocus}
        size="lg"
        variant="ghost"
      >
        <CardColorOnboarding />
        <input
          className="sr-only"
          onChange={handleChange}
          ref={colorInputRef}
          type="color"
          value={state.view.canvas}
        />
        <PaintBrushIcon aria-hidden="true" className="h-5 w-5" />
        <span className="sr-only">{loc('topbar_canvas')}</span>
      </IconButton>
    </Tooltip>
  )
}
