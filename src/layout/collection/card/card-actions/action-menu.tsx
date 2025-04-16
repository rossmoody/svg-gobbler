import { Menu, Transition } from '@headlessui/react'
import {
  ArrowDownTrayIcon,
  ClipboardDocumentIcon,
  DocumentDuplicateIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Fragment } from 'react/jsx-runtime'
import { IconButton } from 'src/components'
import { transitions } from 'src/constants/transitions'
import { loc } from 'src/utilities/i18n'

import { CardData } from '..'
import { ActionMenuItem } from './action-menu-item'
import { useCardActions } from './use-card-actions'

export const CardActionMenu = ({ data }: CardData) => {
  const { copyOriginal, deleteItem, downloadOriginal, duplicateItem } = useCardActions(data)

  return (
    <div
      className={clsx(
        'absolute right-1 top-1 opacity-0 group-hover/card:opacity-100',
        'group/select z-20 transition-all duration-300 ease-in-out',
      )}
    >
      <Menu as="div" className="relative">
        <Menu.Button as="div">
          <label className="flex cursor-pointer items-center justify-center rounded-lg p-2 group-hover/select:bg-gray-100/70 group-hover/select:dark:bg-gray-800">
            <IconButton className="rounded-md" size="xs" variant="secondary">
              <EllipsisHorizontalIcon aria-hidden="true" className="h-3 w-3" />
            </IconButton>
          </label>
        </Menu.Button>
        <Transition as={Fragment} {...transitions.menu}>
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
