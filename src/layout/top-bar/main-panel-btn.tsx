import { Bars3Icon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { IconButton, Tooltip } from 'src/components'
import { useMainPanel } from 'src/providers'

export const MainPanelButton = () => {
  const { dispatch: mainPanelDispatch, state: mainPanelState } = useMainPanel()

  function toggleMainPanel() {
    mainPanelDispatch({ type: 'set-open', payload: !mainPanelState.isOpen })
  }

  return (
    <Tooltip content="Export panel" side="left">
      <IconButton variant="ghost" onClick={toggleMainPanel}>
        <Bars3Icon
          height={24}
          className={clsx(mainPanelState.isOpen ? '-rotate-90' : 'rotate-0', 'transition-all')}
          aria-hidden="true"
        />
        <span className="sr-only">Toggle export panel view</span>
      </IconButton>
    </Tooltip>
  )
}
