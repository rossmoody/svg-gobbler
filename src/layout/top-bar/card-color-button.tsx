import { PaintBrushIcon } from '@heroicons/react/24/outline'
import { merge } from 'lodash'
import { useCallback, useRef } from 'react'
import { IconButton, Tooltip } from 'src/components'
import { useCollection, useUser } from 'src/providers'
import { loc } from 'src/utilities/i18n'
import { StorageUtilities } from 'src/utilities/storage-utilities'

import { CardColorOnboarding } from './card-color-onboarding'

export const CardColorButton = () => {
  const { dispatch: userDispatch, state: userState } = useUser()
  const { dispatch, state } = useCollection()
  const colorInputReference = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    colorInputReference.current?.click()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: event.target.value, type: 'set-canvas-color' })
    StorageUtilities.setStorageData('view', { ...state.view, canvas: event.target.value })
  }

  const onFocus = useCallback(() => {
    if (!userState.onboarding.viewedCardColor) {
      const newUser = merge(userState, { onboarding: { viewedCardColor: true } })
      userDispatch({ payload: newUser, type: 'set-user' })
      StorageUtilities.setStorageData('user', newUser)
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
          ref={colorInputReference}
          type="color"
          value={state.view.canvas}
        />
        <PaintBrushIcon aria-hidden="true" className="h-5 w-5" />
        <span className="sr-only">{loc('topbar_canvas')}</span>
      </IconButton>
    </Tooltip>
  )
}
