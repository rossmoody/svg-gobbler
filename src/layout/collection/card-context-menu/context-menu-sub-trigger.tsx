import * as ContextMenu from '@radix-ui/react-context-menu'
import clsx from 'clsx'
import { forwardRef } from 'react'

export const ContextMenuSubTrigger = forwardRef<HTMLDivElement, ContextMenu.MenuSubTriggerProps>(
  (props, ref) => (
    <ContextMenu.SubTrigger
      {...props}
      ref={ref}
      className={clsx(
        'flex w-full cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none',
        'focus:bg-gray-50 dark:focus:bg-gray-900',
      )}
    />
  ),
)
