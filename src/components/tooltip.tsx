import * as Tooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'

type TooltipProps = {
  /**
   * The content of the tooltip.
   */
  content: string
  /**
   * The side the tooltip will render in relation to the trigger element.
   * Defaults to 'bottom'
   */
  side: 'top' | 'right' | 'bottom' | 'left'
}

export default ({ children, content, side = 'bottom' }: PropsWithChildren<TooltipProps>) => (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side={side}
          sideOffset={4}
          className={clsx(
            'radix-side-top:animate-slide-down-fade',
            'radix-side-right:animate-slide-left-fade',
            'radix-side-bottom:animate-slide-up-fade',
            'radix-side-left:animate-slide-right-fade',
            'inline-flex items-center rounded-md px-3 py-2',
            'bg-gray-800 shadow-md text-xs text-gray-100',
          )}
        >
          {content}
          <Tooltip.Arrow className="fill-current text-gray-800" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
)
