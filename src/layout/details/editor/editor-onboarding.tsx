import * as Tooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'
import { useUser } from 'src/providers'

export const EditorOnboarding = ({ children }: PropsWithChildren) => {
  const { state } = useUser()

  if (state.onboarding.viewedEditSvg) {
    return children
  }

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
            'inline-flex items-center rounded-lg px-3 py-2',
            'bg-gray-800 text-xs shadow-md dark:bg-white',
            'max-w-[20rem] text-white dark:text-gray-800',
          )}
          side="top"
          sideOffset={4}
        >
          This is a live editor, try changing the code
          <Tooltip.Arrow className="fill-current text-gray-800 dark:text-gray-200" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}
