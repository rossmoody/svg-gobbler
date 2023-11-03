import { Fragment, PropsWithChildren } from 'react'
import { Mainbar } from './main-bar'
import { Mainpanel } from './main-panel'
import { Sidebar } from './sidebar'
import { TopBar } from './top-bar'

export const Dashboard = ({ children }: PropsWithChildren) => (
  <Fragment>
    <Sidebar />
    <div className="lg:pl-72 transition-all relative overflow-hidden bg-white dark:bg-gray-900">
      <TopBar />
      <div className="flex">
        <main className="flex-1">
          <Mainbar />
          {children}
        </main>
        <Mainpanel />
      </div>
    </div>
  </Fragment>
)
