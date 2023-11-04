import { Bars3Icon } from '@heroicons/react/24/outline'
import { IconButton, Tooltip } from 'src/components'
import { useSidebar } from 'src/providers/sidebar'
import { CollectionTitle } from './collection-title'
import { MainPanelButton } from './main-panel-btn'
import { ThemeButton } from './theme-btn'

export const TopBar = () => {
  const { dispatch: sidebarDispatch } = useSidebar()

  function openSidebar() {
    sidebarDispatch({ type: 'set-open', payload: true })
  }

  return (
    <section className="top-bar">
      <Tooltip content="Collections" side="right">
        <IconButton variant="ghost" onClick={openSidebar} className="lg:hidden">
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">Open collection panel</span>
        </IconButton>
      </Tooltip>
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />
      <CollectionTitle />
      <div className="flex flex-1 self-stretch gap-x-4 lg:gap-x-6">
        <div className="flex items-center gap-x-2 lg:gap-x-4 ml-auto">
          <ThemeButton />
          <div className="h-6 w-px bg-gray-200" aria-hidden="true" />
          <MainPanelButton />
        </div>
      </div>
    </section>
  )
}
