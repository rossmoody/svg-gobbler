import { Provider as ToastProvider, Viewport } from '@radix-ui/react-toast'
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip'
import { Outlet } from 'react-router-dom'
import { Sidebar } from 'src/layout/sidebar'
import { CollectionProvider, DashboardProvider, UserProvider } from 'src/providers'
import { ExportProvider } from 'src/providers/export'

export const DashboardRoute = () => (
  <ToastProvider>
    <TooltipProvider delayDuration={100}>
      <DashboardProvider>
        <CollectionProvider>
          <ExportProvider>
            <UserProvider>
              <Sidebar />
              <div className="relative h-screen min-h-screen overflow-hidden transition-all lg:pl-72">
                <Outlet />
              </div>
            </UserProvider>
          </ExportProvider>
        </CollectionProvider>
      </DashboardProvider>
    </TooltipProvider>
    <Viewport className="toast-viewport" />
  </ToastProvider>
)
