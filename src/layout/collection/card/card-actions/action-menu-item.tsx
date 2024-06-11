import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'

type Props = {
  onClick: () => void
}

export const ActionMenuItem = ({ children, onClick }: PropsWithChildren<Props>) => (
  <Menu.Item>
    {({ active }) => (
      <span
        className={clsx(
          active && 'bg-gray-100 dark:bg-gray-700',
          'block cursor-pointer rounded-md px-2 py-2 text-xs',
          'flex items-center',
        )}
        onClick={onClick}
      >
        {children}
      </span>
    )}
  </Menu.Item>
)
