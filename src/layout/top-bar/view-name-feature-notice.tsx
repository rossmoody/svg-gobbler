import * as Tooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import { useMemo } from 'react'
import { useUser } from 'src/providers'
import { loc } from 'src/utilities/i18n'

export const ViewNameFeatureNotice = () => {
  const { state: userState } = useUser()

  const shouldShowNewFeatureTooltip = useMemo(() => {
    return (
      !userState.features.viewedNameFeature &&
      userState.onboarding.viewedCardColor &&
      new Date(userState.installDate) < new Date('2025-04-02')
    )
  }, [userState])

  if (shouldShowNewFeatureTooltip) {
    return (
      <Tooltip.Root open>
        <Tooltip.Trigger asChild>
          <span className="absolute inset-x-0" />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={clsx(
              'radix-side-top:animate-slide-down-fade',
              'radix-side-right:animate-slide-left-fade',
              'radix-side-bottom:animate-slide-up-fade',
              'radix-side-left:animate-slide-right-fade',
              'inline-flex items-center rounded-lg px-2 py-2',
              'bg-gray-800 text-xs shadow-md dark:bg-white',
              'max-w-[16rem] text-center text-white dark:text-gray-800',
            )}
            side="bottom"
            sideOffset={20}
          >
            {loc('view_show_feature_notice')}
            <Tooltip.Arrow className="fill-current text-gray-800 dark:text-gray-200" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    )
  }
}
