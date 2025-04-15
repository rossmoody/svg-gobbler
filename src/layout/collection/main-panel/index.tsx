import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Tabs } from 'src/components'
import { useCollection } from 'src/providers'
import { loc } from 'src/utils/i18n'

import { EditPanel } from './edit-panel'
import { ExportFooter } from './export-footer'
import { ExportPanel } from './export-panel'

export const MainPanel = () => {
  const { state: collectionState } = useCollection()

  return (
    <Transition
      enter="transition-all duration-500"
      enterFrom="opacity-0 w-[0]"
      enterTo="opacity-100 w-[18rem]"
      leave="transition-all duration-500"
      leaveFrom="opacity-100 w-[18rem]"
      leaveTo="opacity-0 w-[0]"
      show={collectionState.selected.length > 0}
    >
      <aside
        className={clsx(
          'surface h-[calc(100dvh-theme(space.16))] shrink-0 overflow-y-auto border-l',
          'transition-width border-gray-200 duration-500 ease-in dark:border-gray-800',
          'w-80',
        )}
      >
        <div className="flex h-full flex-col">
          <Tabs.Group>
            <Tabs.List className="flex h-12 shrink-0 items-end">
              <Tabs.Tab>{loc('export_export')}</Tabs.Tab>
              <Tabs.Tab>Edit</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panels className="min-h-0 flex-1">
              <Tabs.Panel className="flex h-full flex-col">
                <ExportPanel />
                <ExportFooter />
              </Tabs.Panel>
              <Tabs.Panel className="flex h-full flex-col">
                <EditPanel />
              </Tabs.Panel>
            </Tabs.Panels>
          </Tabs.Group>
        </div>
      </aside>
    </Transition>
  )
}
