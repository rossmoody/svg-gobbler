import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Popover } from '@headlessui/react'
import { useCallback, useMemo } from 'react'
import { useDashboard } from 'src/providers'
import { StorageUtilities } from 'src/utilities/storage-utilities'

import { type CollectionItemProperties } from './collection-item'

type EmojiMartData = {
  id: string
  keywords: string[]
  name: string
  native: string
  shortcodes: string
  unified: string
}

export const CollectionItemIcon = ({ collection }: CollectionItemProperties) => {
  const { dispatch, state } = useDashboard()
  const { emoji, name, origin } = collection

  const setCollectionEmoji = useCallback(
    ({ native }: EmojiMartData) => {
      const updatedCollection = { ...collection, emoji: native }
      const updatedCollections = state.collections.map((c) =>
        c.id === collection.id ? updatedCollection : c,
      )
      dispatch({ payload: updatedCollection, type: 'set-collection-icon' })
      StorageUtilities.setStorageData('collections', updatedCollections)
    },
    [collection, state.collections, dispatch],
  )

  const collectionIcon = useMemo(() => {
    if (emoji) {
      return emoji
    }

    if (origin) {
      return (
        <img
          alt={name}
          className="h-4 w-4 rounded-sm"
          src={`https://s2.googleusercontent.com/s2/favicons?domain=${origin}`}
        />
      )
    }

    return '📁'
  }, [emoji, name, origin])

  return (
    <Popover className="relative flex">
      <Popover.Button className="rounded-md p-1 hover:bg-gray-200 dark:hover:bg-gray-600">
        <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md text-base">
          {collectionIcon}
        </div>
      </Popover.Button>
      <Popover.Panel className="fixed z-20 mt-6">
        {({ close }) => (
          <Picker
            data={data}
            onEmojiSelect={(emojiMartData: EmojiMartData) => {
              setCollectionEmoji(emojiMartData)
              close()
            }}
            perLine={7}
          />
        )}
      </Popover.Panel>
    </Popover>
  )
}
