import * as ContextMenu from '@radix-ui/react-context-menu'
import clsx from 'clsx'
import { forwardRef } from 'react'

export const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenu.ContextMenuItemProps>(
  (props, ref) => (
    <ContextMenu.Item
      {...props}
      ref={ref}
      className={clsx(
        'flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none',
        'focus:bg-gray-50 dark:focus:bg-gray-900',
      )}
    />
  ),
)
