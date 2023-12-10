import { Bars3Icon } from '@heroicons/react/24/outline'
import { useDashboard } from 'src/providers'

import { IconButton, Tooltip } from '.'

/**
 * The modular button that opens the collection panel in mobile viewports.
 */
export const CollectionPanelButton = () => {
  const { dispatch: sidebarDispatch } = useDashboard()

  function openSidebar() {
    sidebarDispatch({ payload: true, type: 'set-open' })
  }

  return (
    <Tooltip content="Collections" side="right">
      <IconButton className="lg:hidden" onClick={openSidebar} variant="ghost">
        <Bars3Icon aria-hidden className="h-5 w-5" />
        <span className="sr-only">Open collection panel</span>
      </IconButton>
    </Tooltip>
  )
}
