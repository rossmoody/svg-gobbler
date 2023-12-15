import * as Tooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import _ from 'lodash'
import { PropsWithChildren } from 'react'
import { useUser } from 'src/providers'
import { StorageUtils } from 'src/utils/storage-utils'
import { type Svg } from 'svg-gobbler-scripts'

type Props = {
  data: Svg
}

export const CardOnboarding = ({ children, data }: PropsWithChildren<Props>) => {
  const { dispatch, state } = useUser()

  const handleRightClick = () => {
    const userState = _.merge(state, { onboarding: { viewedCardContext: true } })
    dispatch({ payload: userState, type: 'set-user' })
    StorageUtils.setStorageData('user', userState)
  }

  if (data.corsRestricted || state.onboarding.viewedCardContext) {
    return <>{children}</>
  }

  return (
    <Tooltip.Root>
      <Tooltip.Trigger className="h-full w-full" onContextMenu={handleRightClick}>
        {children}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className={clsx(
            'radix-side-top:animate-slide-down-fade',
            'radix-side-right:animate-slide-left-fade',
            'radix-side-bottom:animate-slide-up-fade',
            'radix-side-left:animate-slide-right-fade',
            'inline-flex items-center rounded-lg px-3 py-2',
            'bg-gray-800 text-xs shadow-md dark:bg-white',
            'max-w-[16rem] text-white dark:text-gray-800',
          )}
          side="top"
          sideOffset={4}
        >
          Right click for context menu
          <Tooltip.Arrow className="fill-current text-gray-800 dark:text-gray-200" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}
