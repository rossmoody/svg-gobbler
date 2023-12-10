import type { PageData } from 'src/types'

import { Transition } from '@headlessui/react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, IconButton } from 'src/components'
import { useDetails } from 'src/providers'
import { StorageUtils } from 'src/utils/storage-utils'

export const Header = () => {
  const navigate = useNavigate()
  const { dispatch, state } = useDetails()

  const isDirty = useMemo(
    () => state.currentString !== state.originalString,
    [state.currentString, state.originalString],
  )

  const handleReset = () => {
    dispatch({ payload: state.originalString, type: 'update-current-string' })
  }

  const handleSave = async () => {
    const collectionData = await StorageUtils.getPageData(state.collectionId)

    const pageData: PageData = {
      ...collectionData,
      data: collectionData.data.map((item) =>
        item.id === state.id ? { id: item.id, svg: state.currentString } : item,
      ),
    }

    await StorageUtils.setPageData(state.collectionId, pageData)
    dispatch({ payload: state.currentString, type: 'update-original-string' })
  }

  const navigateBack = () => {
    if (isDirty) {
      if (window.confirm('Are you sure you want to leave? Your changes will be lost.')) {
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
        <h1 className="text-lg font-semibold">Edit SVG</h1>
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
          Reset changes
        </Button>
        <Button onClick={handleSave}>Save changes</Button>
      </Transition>
    </header>
  )
}
