import { Tab as HeadlessTab } from '@headlessui/react'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'

const Group = ({ children }: PropsWithChildren) => {
  return <HeadlessTab.Group>{children}</HeadlessTab.Group>
}

const List = ({ children }: PropsWithChildren) => {
  return (
    <HeadlessTab.List className="border-b border-gray-200 dark:border-gray-700">
      {children}
    </HeadlessTab.List>
  )
}

const Panels = ({ children }: PropsWithChildren) => {
  return <HeadlessTab.Panels>{children}</HeadlessTab.Panels>
}

const Panel = ({ children }: PropsWithChildren) => {
  return <HeadlessTab.Panel>{children}</HeadlessTab.Panel>
}

const Tab = ({ children }: PropsWithChildren) => {
  return (
    <HeadlessTab
      className={clsx(
        'ui-selected:border-red-500 ui-selected:text-red-500 ui-selected:font-medium',
        'text hover:border-gray-200 border-transparent',
        'whitespace-nowrap border-b-2 py-1.5 px-3 text-sm',
      )}
    >
      {children}
    </HeadlessTab>
  )
}

export const Tabs = {
  Group,
  List,
  Panels,
  Panel,
  Tab,
}
