import { Transition } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { Button, CollectionPanelButton } from 'src/components'
import { useExportData } from 'src/hooks'
import { useCollection } from 'src/providers'
import { loc } from 'src/utils/i18n'

import { UploadModal } from '../collection/upload-modal'
import { CardColorButton } from './card-color-button'
import { CollectionTitle } from './collection-title'
import { SizeSelect } from './size-select'
import { SortMenu } from './sort-menu'
import { ThemeButton } from './theme-btn'
import { ViewPopover } from './view-popover'

export const TopBar = () => {
  const [open, setOpen] = useState(false)
  const { state } = useCollection()
  const { exportCurrentCollectionDataAsZip } = useExportData()

  const shouldShowDownloadAll = state.data.length > 1

  function handleOpen() {
    setOpen(true)
  }

  function handleDownloadAll() {
    exportCurrentCollectionDataAsZip(state.collectionId)
  }

  return (
    <section className="top-bar">
      <CollectionPanelButton />
      <div aria-hidden className="mr-2 flex h-6 min-w-px bg-gray-200 dark:bg-gray-700 lg:hidden" />
      <CollectionTitle />
      <div className="ml-auto hidden shrink-0 items-center gap-x-3 sm:flex lg:gap-x-4">
        <div className="flex items-center gap-x-2">
          <CardColorButton />
          <ThemeButton />
        </div>
        <div aria-hidden className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center gap-x-2">
          <SizeSelect />
          <ViewPopover />
          <SortMenu />
        </div>
        <div aria-hidden className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center gap-x-2">
          <Button onClick={handleOpen} variant="secondary">
            <span className="hidden md:inline-block">{loc('topbar_upload')}</span>
            <PlusIcon className="h-4 w-4" />
          </Button>
          <Transition
            as="span"
            enter="transition-all duration-500"
            enterFrom="opacity-0 scale-60"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-50"
            show={shouldShowDownloadAll}
          >
            <Button onClick={handleDownloadAll} variant="primary">
              <span className="hidden md:inline-block">{loc('download_all')}</span>
              <ArrowDownTrayIcon className="h-4 w-4" />
            </Button>
          </Transition>
        </div>
      </div>
      <UploadModal open={open} setOpen={setOpen} />
    </section>
  )
}
