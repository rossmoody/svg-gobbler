import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Fragment } from 'react'
import { defaultSvgoPlugins, SvgoPlugin } from 'src/constants/svgo-plugins'
import { transitions } from 'src/constants/transitions'
import { useExport } from 'src/providers'
import { loc } from 'src/utilities/i18n'
import { StorageUtilities } from 'src/utilities/storage-utilities'

export const ResetButton = () => {
  const { dispatch, state } = useExport()

  const resetToDefault = async () => {
    const plugins = (await StorageUtilities.getStorageData<SvgoPlugin[]>('plugins')) ?? []
    dispatch({ payload: plugins, type: 'set-svgo-plugins' })
  }

  const resetToEmpty = () => {
    dispatch({ payload: [], type: 'set-svgo-plugins' })
  }

  const resetToSvgoDefault = () => {
    dispatch({ payload: defaultSvgoPlugins, type: 'set-svgo-plugins' })
  }

  const setAsDefault = async () => {
    StorageUtilities.setStorageData('plugins', state.settings.svg.svgoPlugins)
  }

  const menuItem = [
    { label: 'Default settings', onClick: resetToDefault },
    { label: 'SVGO default', onClick: resetToSvgoDefault },
    { label: 'Deselect all', onClick: resetToEmpty },
  ]

  return (
    <Fragment>
      <Menu>
        <Menu.Button className="flex items-center gap-1">
          {loc('export_apply')} <ChevronDownIcon className="h-4 w-4" />
        </Menu.Button>

        <Transition as={Fragment} {...transitions.menu}>
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
                    Set as default
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
