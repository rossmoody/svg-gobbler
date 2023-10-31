import { Bars3Icon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { IconButton } from 'src/components'
import Tooltip from 'src/components/tooltip'
import { useColorMode } from 'src/hooks'
import { useMainPanel } from 'src/providers/mainpanel'
import { useSidebar } from 'src/providers/sidebar'

export const TopBar = () => {
  const { dispatch: sidebarDispatch } = useSidebar()
  const { dispatch: mainPanelDispatch, state: mainPanelState } = useMainPanel()
  const { colorMode, toggleColorMode } = useColorMode()

  function openSidebar() {
    sidebarDispatch({ type: 'set-open', payload: true })
  }

  function toggleMainPanel() {
    mainPanelDispatch({ type: 'set-open', payload: !mainPanelState.isOpen })
  }

  return (
    <section className="flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4  sm:gap-x-6 sm:px-6 lg:px-8">
      <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={openSidebar}>
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Mobile separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center gap-x-2 lg:gap-x-4 ml-auto">
          <Tooltip content="Color mode">
            <IconButton variant="ghost" onClick={toggleColorMode}>
              {colorMode === 'dark' ? <MoonIcon height={24} /> : <SunIcon height={24} />}
            </IconButton>
          </Tooltip>
          <div className="h-6 w-px bg-gray-200" aria-hidden="true" />
          <Tooltip content="Export panel" side="left">
            <IconButton variant="ghost" onClick={toggleMainPanel}>
              <Bars3Icon
                height={24}
                className={clsx(
                  mainPanelState.isOpen ? '-rotate-90' : 'rotate-0',
                  'transition-all',
                )}
              />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </section>
  )
}
