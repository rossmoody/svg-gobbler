import { Outlet } from 'react-router-dom'
import { Dashboard } from 'src/layout/dashboard'
import { MainPanelProvider, MainProvider, SidebarProvider, TopBarProvider } from 'src/providers'

export const DashboardRoute = () => (
  <SidebarProvider>
    <MainPanelProvider>
      <MainProvider>
        <TopBarProvider>
          <Dashboard>
            <Outlet />
          </Dashboard>
        </TopBarProvider>
      </MainProvider>
    </MainPanelProvider>
  </SidebarProvider>
)
