import { Transition } from '@headlessui/react'
import { CollectionPanelButton } from 'src/components'
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
      <header className="px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-200 dark:border-gray-800 flex gap-4 items-center">
        <CollectionPanelButton />
        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 lg:hidden" aria-hidden />
        <h1 className="text-3xl font-semibold leading-none">Settings</h1>
      </header>

      {/* Settings forms */}
      <main className="pb-20">
        <GeneralSettings />

        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7">Change password</h2>
            <p className="mt-1 text-sm leading-6 text-muted">
              Update your password associated with your account.
            </p>
          </div>

          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <label htmlFor="current-password" className="label">
                  Current password
                </label>
                <div className="mt-2">
                  <input
                    id="current-password"
                    name="current_password"
                    type="password"
                    autoComplete="current-password"
                    className="input"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="new-password" className="label">
                  New password
                </label>
                <div className="mt-2">
                  <input
                    id="new-password"
                    name="new_password"
                    type="password"
                    autoComplete="new-password"
                    className="input"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="confirm-password" className="label">
                  Confirm password
                </label>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    name="confirm_password"
                    type="password"
                    autoComplete="new-password"
                    className="input"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </Transition>
  )
}
