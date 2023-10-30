import { PropsWithChildren } from 'react'
import { SidebarProvider } from './sidebar'

export const Providers = ({ children }: PropsWithChildren) => {
  return <SidebarProvider>{children}</SidebarProvider>
}
