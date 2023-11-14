import { Tab as HeadlessTab } from '@headlessui/react'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'

const Group = (props: PropsWithChildren) => <HeadlessTab.Group {...props} />

const List = (props: PropsWithChildren) => (
  <HeadlessTab.List className="border-b border-gray-200 dark:border-gray-700" {...props} />
)

const Panels = (props: PropsWithChildren) => <HeadlessTab.Panels {...props} />

const Panel = (props: PropsWithChildren) => <HeadlessTab.Panel {...props} />

const Tab = (props: PropsWithChildren) => (
  <HeadlessTab
    {...props}
    className={clsx(
      'ui-selected:border-red-500 ui-selected:font-medium ui-selected:text-red-500',
      'border-transparent text-gray-600 hover:border-gray-200 ui-not-selected:dark:text-gray-400',
      'whitespace-nowrap border-b-2 px-4 py-1.5 text-base dark:hover:border-gray-600',
    )}
  />
)

export const Tabs = {
  Group,
  List,
  Panels,
  Panel,
  Tab,
}
