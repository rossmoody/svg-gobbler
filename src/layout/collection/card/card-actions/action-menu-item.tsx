import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'

type Properties = {
  onClick: () => void
}

export const ActionMenuItem = ({ children, onClick }: PropsWithChildren<Properties>) => (
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
