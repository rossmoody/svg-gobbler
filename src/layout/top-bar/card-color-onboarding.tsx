import * as Tooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import { useMemo } from 'react'
import { useCollection, useUser } from 'src/providers'
import { loc } from 'src/utilities/i18n'

export const CardColorOnboarding = () => {
  const { state: userState } = useUser()
  const { state: collectionState } = useCollection()

  const collectionHasSvgWithWhite = useMemo(() => {
    const whiteValues = ['white', '#fff', '#ffffff']

    return collectionState.processedData.some(({ presentationSvg }) =>
      whiteValues.some((whiteValue) => presentationSvg.includes(whiteValue)),
    )
  }, [collectionState.processedData])

  const shouldShowCardColorOnboarding = useMemo(() => {
    return (
      collectionHasSvgWithWhite &&
      !userState.onboarding.viewedCardColor &&
      process.env.NODE_ENV === 'production'
    )
  }, [collectionHasSvgWithWhite, userState.onboarding.viewedCardColor])

  if (shouldShowCardColorOnboarding) {
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
            {loc('onboarding_card_color')}
            <Tooltip.Arrow className="fill-current text-gray-800 dark:text-gray-200" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    )
  }
}
