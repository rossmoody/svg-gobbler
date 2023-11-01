import { Outlet } from 'react-router-dom'
import { Dashboard } from 'src/layout/dashboard'
import { MainPanelProvider, SidebarProvider } from 'src/providers'

export const Root = () => (
  <SidebarProvider>
    <MainPanelProvider>
      <Dashboard>
        <Outlet />
      </Dashboard>
    </MainPanelProvider>
  </SidebarProvider>
)
