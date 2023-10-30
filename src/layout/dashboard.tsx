import { PropsWithChildren } from 'react'
import { Main } from './main'
import { Sidebar } from './sidebar'
import { TopBar } from './top-bar'

export function Dashboard({ children }: PropsWithChildren) {
  return (
    <div>
      <Sidebar />
      <div className="lg:pl-72 transition-all">
        <TopBar />
        <Main>{children}</Main>
      </div>
    </div>
  )
}
