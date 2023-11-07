import { Bars3Icon } from '@heroicons/react/24/outline'
import { IconButton, Tooltip } from 'src/components'
import { useDashboard } from 'src/providers/dashboard'
import { CollectionTitle } from './collection-title'
import { SizeSelect } from './size-select'
import { SortMenu } from './sort-menu'
import { ThemeButton } from './theme-btn'
import { UploadModal } from './upload-modal'
import { ViewPopover } from './view-popover'

export const TopBar = () => {
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
          <UploadModal />
        </div>
      </div>
    </section>
  )
}
