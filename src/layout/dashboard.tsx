import { PropsWithChildren } from 'react'
import { Mainbar } from './main-bar'
import { Mainpanel } from './main-panel'
import { Sidebar } from './sidebar'
import { TopBar } from './top-bar'

export function Dashboard({ children }: PropsWithChildren) {
  return (
    <>
      <Sidebar />
      <div className="lg:pl-72 transition-all relative overflow-hidden">
        <TopBar />
        <div className="flex">
          <div className="flex-1">
            <Mainbar />
            <main className="py-10 px-4 sm:px-6 lg:px-8 overflow-y-auto h-[calc(100dvh-theme(space.28))] dark:bg-slate-900 transition-colors">
              {children}
            </main>
          </div>
          <Mainpanel />
        </div>
      </div>
    </>
  )
}
