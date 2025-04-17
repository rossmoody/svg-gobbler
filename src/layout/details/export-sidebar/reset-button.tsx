import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Fragment } from 'react'
import { defaultSvgoPlugins, SvgoPlugin } from 'src/constants/svgo-plugins'
import { useDetails } from 'src/providers'
import { loc } from 'src/utilities/i18n'
import { StorageUtilities } from 'src/utilities/storage-utilities'

export const ResetButton = () => {
  const { dispatch, state } = useDetails()

  const resetToDefault = async () => {
    const plugins = (await StorageUtilities.getStorageData<SvgoPlugin[]>('plugins')) ?? []
    dispatch({ payload: plugins, type: 'set-svgo-plugins' })
    dispatch({ type: 'process-current-string' })
  }

  const resetToEmpty = () => {
    dispatch({ payload: [], type: 'set-svgo-plugins' })
    dispatch({ type: 'process-current-string' })
  }

  const resetToSvgoDefault = () => {
    dispatch({ payload: defaultSvgoPlugins, type: 'set-svgo-plugins' })
    dispatch({ type: 'process-current-string' })
  }

  const setAsDefault = async () => {
    StorageUtilities.setStorageData('plugins', state.export.svgoConfig.plugins)
  }

  const menuItem = [
    { label: loc('details_default'), onClick: resetToDefault },
    { label: loc('details_svgo_default'), onClick: resetToSvgoDefault },
    { label: loc('details_deselect_all'), onClick: resetToEmpty },
  ]

  return (
    <Fragment>
      <Menu>
        <Menu.Button className="flex items-center gap-1">
          {loc('export_apply')} <ChevronDownIcon className="h-4 w-4" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={clsx(
              'absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md',
              'bg-white shadow-2xl ring-1 ring-black dark:bg-gray-800 dark:ring-white',
              'focus ring-opacity-5 dark:ring-opacity-5',
            )}
          >
            <div className="py-1">
              {menuItem.map((item) => (
                <Menu.Item key={item.label}>
                  {({ active }) => (
                    <span
                      className={clsx('block cursor-pointer px-3 py-1.5 text-xs', {
                        'bg-gray-100 dark:bg-gray-700': active,
                      })}
                      onClick={item.onClick}
                    >
                      {item.label}
                    </span>
                  )}
                </Menu.Item>
              ))}
              <div className="my-2 border-t border-gray-100 dark:border-gray-700" />
              <Menu.Item>
                {({ active }) => (
                  <span
                    className={clsx('block cursor-pointer px-3 py-1.5 text-xs', {
                      'bg-gray-100 dark:bg-gray-700': active,
                    })}
                    onClick={setAsDefault}
                  >
                    {loc('details_set_default')}
                  </span>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </Fragment>
  )
}
