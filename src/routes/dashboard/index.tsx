import { Outlet } from 'react-router-dom'
import { Dashboard as DashboardLayout } from 'src/layout/dashboard'
import { MainPanelProvider, MainProvider, SidebarProvider, TopBarProvider } from 'src/providers'

export const DashboardRoute = () => (
  <SidebarProvider>
    <MainPanelProvider>
      <MainProvider>
        <TopBarProvider>
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        </TopBarProvider>
      </MainProvider>
    </MainPanelProvider>
  </SidebarProvider>
)
