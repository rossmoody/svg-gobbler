import type { PageData } from 'src/types'

import { Transition } from '@headlessui/react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, IconButton } from 'src/components'
import { useDetails } from 'src/providers'
import { loc } from 'src/utilities/i18n'
import { StorageUtilities } from 'src/utilities/storage-utilities'

export const Header = () => {
  const navigate = useNavigate()
  const { dispatch, state } = useDetails()
  const { collectionId, currentString, id, name, originalName, originalString } = state

  const isDirty = useMemo(() => {
    return currentString !== originalString || name !== originalName
  }, [currentString, originalString, name, originalName])

  const handleReset = () => {
    dispatch({ payload: originalString, type: 'update-current-string' })
    dispatch({ payload: originalName, type: 'update-name' })
  }

  const handleSave = async () => {
    const collectionData = await StorageUtilities.getPageData(collectionId)

    const pageData: PageData = {
      ...collectionData,
      data: collectionData.data.map((item) =>
        item.id === id
          ? {
              corsRestricted: item.corsRestricted,
              id: item.id,
              lastEdited: new Date().toISOString(),
              name,
              svg: currentString,
            }
          : item,
      ),
    }

    await StorageUtilities.setPageData(collectionId, pageData)
    dispatch({ payload: currentString, type: 'update-original-string' })
    dispatch({ payload: name, type: 'update-original-name' })
  }

  const navigateBack = () => {
    if (isDirty) {
      if (globalThis.confirm(loc('details_are_you_sure'))) {
        navigate(-1)
      }
      return
    }
    navigate(-1)
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
      <nav className="flex items-center gap-3">
        <IconButton onClick={navigateBack} size="lg" variant="ghost">
          <ArrowLeftIcon className="h-5 w-5" />
        </IconButton>
        <h1 className="text-lg font-semibold">{loc('details_edit_svg')}</h1>
      </nav>
      <Transition
        as="div"
        className="flex h-full items-center justify-center gap-2"
        enter="transition-all duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition-all duration-300"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        show={isDirty}
      >
        <Button onClick={handleReset} variant="secondary">
          {loc('details_reset_changes')}
        </Button>
        <Button onClick={handleSave}>{loc('details_save_changes')}</Button>
      </Transition>
    </header>
  )
}
