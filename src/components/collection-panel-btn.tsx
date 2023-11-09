import { Bars3Icon } from '@heroicons/react/24/outline'
import { useDashboard } from 'src/providers'
import { IconButton, Tooltip } from '.'

/**
 * The modular button that opens the collection panel in mobile viewports.
 */
export const CollectionPanelButton = () => {
  const { dispatch: sidebarDispatch } = useDashboard()

  function openSidebar() {
    sidebarDispatch({ type: 'set-open', payload: true })
  }

  return (
    <Tooltip content="Collections" side="right">
      <IconButton variant="ghost" onClick={openSidebar} className="lg:hidden">
        <Bars3Icon className="h-5 w-5" aria-hidden />
        <span className="sr-only">Open collection panel</span>
      </IconButton>
    </Tooltip>
  )
}
