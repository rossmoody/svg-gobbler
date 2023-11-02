import { Outlet } from 'react-router-dom'
import { Dashboard as DashboardLayout } from 'src/layout/dashboard'
import { MainPanelProvider, SidebarProvider } from 'src/providers'

export const Dashboard = () => (
  <SidebarProvider>
    <MainPanelProvider>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </MainPanelProvider>
  </SidebarProvider>
)
