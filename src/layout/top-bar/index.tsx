import { PlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Button, CollectionPanelButton } from 'src/components'
import { UploadModal } from '../collection/upload-modal'
import { CollectionTitle } from './collection-title'
import { SizeSelect } from './size-select'
import { SortMenu } from './sort-menu'
import { ThemeButton } from './theme-btn'
import { ViewPopover } from './view-popover'

export const TopBar = () => {
  const [open, setOpen] = useState(false)

  return (
    <section className="top-bar">
      <CollectionPanelButton />
      <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 lg:hidden" aria-hidden />
      <CollectionTitle />
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="ml-auto hidden items-center gap-x-3 sm:flex lg:gap-x-4">
          <ThemeButton />
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" aria-hidden />
          <SizeSelect />
          <ViewPopover />
          <SortMenu />
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" aria-hidden />
          <Button variant="secondary" onClick={() => setOpen(true)}>
            Upload
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <UploadModal open={open} setOpen={setOpen} />
    </section>
  )
}
