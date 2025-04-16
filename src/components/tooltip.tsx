import * as RTooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'

type TooltipProperties = {
  /**
   * The content of the tooltip.
   */
  content: string
  /**
   * The side the tooltip will render in relation to the trigger element.
   * Defaults to 'bottom'
   */
  side?: 'bottom' | 'left' | 'right' | 'top'
}

export const Tooltip = ({
  children,
  content,
  side = 'bottom',
}: PropsWithChildren<TooltipProperties>) => (
  <RTooltip.Root delayDuration={300}>
    <RTooltip.Trigger asChild>{children}</RTooltip.Trigger>
    <RTooltip.Portal>
      <RTooltip.Content
        className={clsx(
          'radix-side-top:animate-slide-down-fade',
          'radix-side-right:animate-slide-left-fade',
          'radix-side-bottom:animate-slide-up-fade',
          'radix-side-left:animate-slide-right-fade',
          'inline-flex items-center rounded-lg px-3 py-2',
          'bg-gray-800 text-xs shadow-md dark:bg-white',
          'max-w-[16rem] text-white dark:text-gray-800',
        )}
        side={side}
        sideOffset={4}
      >
        {content}
        <RTooltip.Arrow className="fill-current text-gray-800 dark:text-gray-200" />
      </RTooltip.Content>
    </RTooltip.Portal>
  </RTooltip.Root>
)
