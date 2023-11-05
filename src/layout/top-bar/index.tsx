import { Bars3Icon, ChevronDownIcon, PaintBrushIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Button, IconButton, Tooltip } from 'src/components'
import { useDashboard } from 'src/providers/dashboard'
import { CollectionTitle } from './collection-title'
import { SizeSelect } from './size-select'
import { ThemeButton } from './theme-btn'

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
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden />
      <CollectionTitle />
      <div className="flex flex-1 self-stretch gap-x-4 lg:gap-x-6">
        <div className="items-center gap-x-2 lg:gap-x-4 ml-auto hidden sm:flex">
          <ThemeButton />
          <Tooltip content="Canvas color">
            <IconButton variant="ghost" onClick={openSidebar}>
              <PaintBrushIcon className="h-5 w-5" aria-hidden />
              <span className="sr-only">Change background color</span>
            </IconButton>
          </Tooltip>
          <div className="bg-gray-200 dark:bg-gray-700 h-6 w-px" aria-hidden />
          <SizeSelect />
          <Button variant="ghost">
            View
            <ChevronDownIcon className="h-3 w-3" aria-hidden />
          </Button>
          <Button variant="ghost">
            Sort
            <ChevronDownIcon className="h-3 w-3" aria-hidden />
          </Button>
          <div className="bg-gray-200 dark:bg-gray-700 h-6 w-px" aria-hidden />
          <Button variant="secondary">
            Upload
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
