import { Outlet } from 'react-router-dom'
import { Sidebar } from 'src/layout/sidebar'
import { MainPanelProvider, MainProvider, SidebarProvider, TopBarProvider } from 'src/providers'

export const DashboardRoute = () => (
  <SidebarProvider>
    <MainPanelProvider>
      <MainProvider>
        <TopBarProvider>
          <Sidebar />
          <div className="lg:pl-72 transition-all relative overflow-hidden bg-white dark:bg-gray-900 min-h-screen">
            <Outlet />
          </div>
        </TopBarProvider>
      </MainProvider>
    </MainPanelProvider>
  </SidebarProvider>
)
