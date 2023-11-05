import { Outlet } from 'react-router-dom'
import { Sidebar } from 'src/layout/sidebar'
import { CollectionProvider, DashboardProvider } from 'src/providers'

export const DashboardRoute = () => (
  <DashboardProvider>
    <CollectionProvider>
      <Sidebar />
      <div className="lg:pl-72 transition-all relative overflow-hidden bg-white dark:bg-gray-900 min-h-screen">
        <Outlet />
      </div>
    </CollectionProvider>
  </DashboardProvider>
)
