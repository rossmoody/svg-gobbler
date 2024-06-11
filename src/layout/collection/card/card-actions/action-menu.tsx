import { Menu, Transition } from '@headlessui/react'
import {
  ArrowDownTrayIcon,
  ChevronDownIcon,
  ClipboardDocumentIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Fragment } from 'react/jsx-runtime'
import { IconButton } from 'src/components'
import { loc } from 'src/utils/i18n'

import { CardData } from '..'
import { ActionMenuItem } from './action-menu-item'
import { useCardActions } from './use-card-actions'

export const CardActionMenu = ({ data }: CardData) => {
  const { copyOriginal, deleteItem, downloadOriginal, duplicateItem } = useCardActions(data)

  return (
    <div
      className={clsx(
        'absolute left-1 top-1 opacity-0 group-hover/card:opacity-100',
        'group/select z-10 transition-all duration-300 ease-in-out',
      )}
    >
      <Menu as="div" className="relative">
        <Menu.Button>
          <label className="flex cursor-pointer items-center justify-center rounded-lg p-2 group-hover/select:bg-gray-100/70 group-hover/select:dark:bg-gray-800">
            <IconButton size="xs" variant="secondary">
              <ChevronDownIcon aria-hidden="true" className="h-4 w-4" />
            </IconButton>
          </label>
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
              'absolute z-10 w-40 origin-top-left rounded-lg p-1',
              'bg-white shadow-md ring-1 ring-black dark:bg-gray-800 dark:ring-white',
              'focus animate-slide-up-fade ring-opacity-5 dark:ring-opacity-5',
            )}
          >
            <ActionMenuItem onClick={copyOriginal}>
              <ClipboardDocumentIcon className="mr-1.5 h-3.5 w-3.5" />
              <span className="flex-grow">{loc('card_action_copy')}</span>
            </ActionMenuItem>
            <ActionMenuItem onClick={downloadOriginal}>
              <ArrowDownTrayIcon className="mr-1.5 h-3.5 w-3.5" />
              <span className="flex-grow">{loc('card_action_download')}</span>
            </ActionMenuItem>
            <span className="my-1 block h-px bg-gray-200 dark:bg-gray-700" />
            <ActionMenuItem onClick={duplicateItem}>
              <DocumentDuplicateIcon className="mr-1.5 h-3.5 w-3.5" />
              {loc('card_action_duplicate')}
            </ActionMenuItem>
            <ActionMenuItem onClick={deleteItem}>
              <TrashIcon className="mr-1.5 h-3.5 w-3.5" />
              {loc('card_action_delete')}
            </ActionMenuItem>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
