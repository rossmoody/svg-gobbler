import { Transition } from '@headlessui/react'
import { CollectionPanelButton } from 'src/components'
import { AboutSettings } from './about-settings'
import { GeneralSettings } from './general-settings'

export const SettingsLayout = () => {
  return (
    <Transition
      show
      appear
      enter="transition-all duration-300 ease-in-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-all duration-300 ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-200 dark:border-gray-800 flex gap-4 items-center">
        <CollectionPanelButton />
        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 lg:hidden" aria-hidden />
        <h1 className="text-2xl font-semibold leading-none">Settings</h1>
      </header>

      {/* Settings forms */}
      <main className="pb-20">
        <GeneralSettings />
        <AboutSettings />
      </main>
    </Transition>
  )
}
