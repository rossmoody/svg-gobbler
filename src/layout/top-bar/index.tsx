import { Bars3Icon, PlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Button, IconButton, Tooltip } from 'src/components'
import { useDashboard } from 'src/providers/dashboard'
import { UploadModal } from '../collection/upload-modal'
import { CollectionTitle } from './collection-title'
import { SizeSelect } from './size-select'
import { SortMenu } from './sort-menu'
import { ThemeButton } from './theme-btn'
import { ViewPopover } from './view-popover'

export const TopBar = () => {
  const [open, setOpen] = useState(false)
  const { dispatch: sidebarDispatch } = useDashboard()

  function openSidebar() {
    sidebarDispatch({ type: 'set-open', payload: true })
  }

  return (
    <section className="top-bar">
      <Tooltip content="Collections" side="right">
        <IconButton variant="ghost" onClick={openSidebar} className="lg:hidden">
          <Bars3Icon className="h-5 w-5" aria-hidden />
          <span className="sr-only">Open collection panel</span>
        </IconButton>
      </Tooltip>
      <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 lg:hidden" aria-hidden />
      <CollectionTitle />
      <div className="flex flex-1 self-stretch gap-x-4 lg:gap-x-6">
        <div className="items-center gap-x-3 lg:gap-x-4 ml-auto hidden sm:flex">
          <ThemeButton />
          <div className="bg-gray-200 dark:bg-gray-700 h-6 w-px" aria-hidden />
          <SizeSelect />
          <ViewPopover />
          <SortMenu />
          <div className="bg-gray-200 dark:bg-gray-700 h-6 w-px" aria-hidden />
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
