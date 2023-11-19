import { Transition } from '@headlessui/react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, IconButton } from 'src/components'
import { useDetails } from 'src/providers'
import { PageData } from 'src/types'
import { StorageUtils } from 'src/utils/storage-utils'
import { useOptimize } from './editor/use-optimize'

export const Header = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useDetails()
  const { format, minify } = useOptimize()

  const navigateBack = () => navigate(-1)

  const isDirty = useMemo(() => {
    return minify(state.originalString) !== minify(state.currentString)
  }, [state.currentString, state.originalString, minify])

  const handleReset = () => {
    dispatch({ type: 'update-current-string', payload: format(state.originalString) })
  }

  const handleSave = async () => {
    const collectionData = await StorageUtils.getPageData(state.collectionId)

    const pageData: PageData = {
      ...collectionData,
      data: collectionData.data.map((svg) => {
        return svg === state.originalString ? state.currentString : svg
      }),
    }

    await StorageUtils.setPageData(state.collectionId, pageData)
    dispatch({ type: 'update-original-string', payload: state.currentString })
  }

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
      <nav className="flex items-center gap-3">
        <IconButton onClick={navigateBack} variant="ghost">
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
          Reset
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </Transition>
    </header>
  )
}
