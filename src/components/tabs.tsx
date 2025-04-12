import type {
  TabGroupProps,
  TabListProps,
  TabPanelProps,
  TabPanelsProps,
  TabProps,
} from '@headlessui/react'
import { Tab as HeadlessTab } from '@headlessui/react'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'

const Group = (props: PropsWithChildren<TabGroupProps<typeof HeadlessTab.Group>>) => (
  <HeadlessTab.Group {...props} />
)

const List = (props: PropsWithChildren<TabListProps<typeof HeadlessTab.List>>) => {
  const { className, ...rest } = props

  return (
    <HeadlessTab.List
      className={clsx(className, 'border-b border-gray-200 dark:border-gray-700')}
      {...rest}
    />
  )
}

const Panels = (props: PropsWithChildren<TabPanelsProps<typeof HeadlessTab.Panels>>) => (
  <HeadlessTab.Panels {...props} />
)

const Panel = (props: PropsWithChildren<TabPanelProps<typeof HeadlessTab.Panel>>) => (
  <HeadlessTab.Panel {...props} />
)

const Tab = (props: PropsWithChildren<TabProps<typeof HeadlessTab>>) => (
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
