import { Bars3Icon } from '@heroicons/react/24/outline'
import { useSidebar } from 'src/providers/sidebar'
import { MainPanelButton } from './main-panel-btn'
import { ThemeButton } from './theme-btn'

export const TopBar = () => {
  const { dispatch: sidebarDispatch } = useSidebar()

  function openSidebar() {
    sidebarDispatch({ type: 'set-open', payload: true })
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
          <ThemeButton />
          <div className="h-6 w-px bg-gray-200" aria-hidden="true" />
          <MainPanelButton />
        </div>
      </div>
    </section>
  )
}
