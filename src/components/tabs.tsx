import { Tab as HeadlessTab } from '@headlessui/react'
import clsx from 'clsx'
import { HTMLAttributes, PropsWithChildren } from 'react'

const Group = (props: PropsWithChildren) => <HeadlessTab.Group {...props} />

const List = (props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  const { className, ...rest } = props

  return (
    <HeadlessTab.List
      className={clsx(className, 'border-b border-gray-200 dark:border-gray-700')}
      {...rest}
    />
  )
}

const Panels = (props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <HeadlessTab.Panels {...props} />
)

const Panel = (props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <HeadlessTab.Panel {...props} />
)

const Tab = (props: PropsWithChildren) => (
  <HeadlessTab
    {...props}
    className={clsx(
      'ui-selected:border-red-500 ui-selected:font-medium ui-selected:text-red-500',
      'border-transparent text-gray-600 hover:border-gray-200 ui-not-selected:dark:text-gray-400',
      'whitespace-nowrap border-b-2 px-4 py-2.5 text-sm dark:hover:border-gray-600',
    )}
  />
)

export const Tabs = {
  Group,
  List,
  Panel,
  Panels,
  Tab,
}
