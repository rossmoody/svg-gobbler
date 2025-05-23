import { Transition } from '@headlessui/react'
import { CollectionPanelButton } from 'src/components'
import { loc } from 'src/utilities/i18n'

import { AboutSettings } from './about-settings'
import { ExportSettings } from './export-settings'
import { GeneralSettings } from './general-settings'

export const SettingsLayout = () => {
  return (
    <Transition
      appear
      className="flex h-full flex-col overflow-y-auto"
      enter="transition-all duration-300 ease-in-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-all duration-300 ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show
    >
      {/* Header */}
      <header className="flex items-center gap-4 border-b border-gray-200 px-4 py-8 dark:border-gray-800 sm:px-6 lg:px-8">
        <CollectionPanelButton />
        <div aria-hidden className="h-6 w-px bg-gray-200 dark:bg-gray-700 lg:hidden" />
        <h1 className="text-2xl font-semibold leading-none">{loc('settings_settings')}</h1>
      </header>

      {/* Settings forms */}
      <main className="pb-20">
        <GeneralSettings />
        <div className="h-px bg-gray-200 dark:bg-gray-700" />
        <ExportSettings />
        <div className="h-px bg-gray-200 dark:bg-gray-700" />
        <AboutSettings />
      </main>
    </Transition>
  )
}
