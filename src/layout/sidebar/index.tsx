import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useDashboard } from 'src/providers/dashboard'
import { DashboardLoaderData } from 'src/routes'
import { loc } from 'src/utilities/i18n'

import { SidebarContent } from './sidebar-content'

export const Sidebar = () => {
  const loaderData = useLoaderData() as DashboardLoaderData
  const { dispatch, state } = useDashboard()

  useEffect(() => {
    dispatch({ payload: loaderData, type: 'init' })
  }, [loaderData, dispatch])

  function closeSidebar() {
    dispatch({ payload: false, type: 'set-open' })
  }

  return (
    <>
      <Transition.Root as={Fragment} show={state.isOpen}>
        <Dialog as="div" className="relative z-20 lg:hidden" onClose={closeSidebar}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button className="-m-2.5 p-2.5" onClick={closeSidebar} type="button">
                      <span className="sr-only">{loc('sidebar_close')}</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                    </button>
                  </div>
                </Transition.Child>
                <SidebarContent />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="z-10 hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <SidebarContent />
      </div>
    </>
  )
}
