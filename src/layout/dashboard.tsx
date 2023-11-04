import { Fragment, PropsWithChildren } from 'react'
import { Sidebar } from './sidebar'

export const Dashboard = ({ children }: PropsWithChildren) => (
  <Fragment>
    <Sidebar />
    {children}
  </Fragment>
)
