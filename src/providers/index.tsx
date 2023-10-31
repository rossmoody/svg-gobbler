import { PropsWithChildren } from 'react'
import { MainPanelProvider } from './mainpanel'
import { SidebarProvider } from './sidebar'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <MainPanelProvider>{children}</MainPanelProvider>
    </SidebarProvider>
  )
}
