import { Logo } from 'src/components'

import { SideFooter } from './sidebar-footer'
import { SidebarHeader } from './sidebar-header'
import { SidebarMain } from './sidebar-main'

export const SidebarContent = () => {
  return (
    <div className="surface flex grow flex-col gap-y-4 overflow-y-auto border-r border-gray-200 px-6 pb-5 dark:border-gray-800">
      <div className="mt-2 flex h-16 shrink-0 items-center">
        <Logo className="h-8 w-auto" />
      </div>
      <nav className="flex flex-1 flex-col" aria-label="Main Navigation">
        <div className="-mx-2 flex flex-1 flex-col gap-1.5">
          <h2 id="collections-heading" className="sr-only">
            Collections
          </h2>
          <SidebarHeader />
          <SidebarMain />
          <span className="flex-1" />
          <SideFooter />
        </div>
      </nav>
    </div>
  )
}
