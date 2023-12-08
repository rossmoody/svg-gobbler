import { Transition } from '@headlessui/react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, IconButton } from 'src/components'
import { useDetails } from 'src/providers'
import type { PageData } from 'src/types'
import { StorageUtils } from 'src/utils/storage-utils'

export const Header = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useDetails()

  const isDirty = useMemo(
    () => state.currentString !== state.originalString,
    [state.currentString, state.originalString],
  )

  const handleReset = () => {
    dispatch({ type: 'update-current-string', payload: state.originalString })
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
    dispatch({ type: 'update-original-string', payload: state.currentString })
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
        <IconButton onClick={navigateBack} variant="ghost" size="lg">
          <ArrowLeftIcon className="h-5 w-5" />
        </IconButton>
        <h1 className="text-lg font-semibold">Edit SVG</h1>
      </nav>
      <Transition
        as="div"
        show={isDirty}
        enter="transition-all duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition-all duration-300"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        className="flex h-full items-center justify-center gap-2"
      >
        <Button variant="secondary" onClick={handleReset}>
          Reset changes
        </Button>
        <Button onClick={handleSave}>Save changes</Button>
      </Transition>
    </header>
  )
}
