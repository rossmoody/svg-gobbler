import * as ToastPrimitive from '@radix-ui/react-toast'
import { Outlet } from 'react-router-dom'
import { Sidebar } from 'src/layout/sidebar'
import { CollectionProvider, DashboardProvider } from 'src/providers'
import { ExportProvider } from 'src/providers/export'

export const DashboardRoute = () => (
  <ToastPrimitive.Provider>
    <DashboardProvider>
      <CollectionProvider>
        <ExportProvider>
          <Sidebar />
          <div className="relative min-h-screen overflow-hidden transition-all lg:pl-72">
            <Outlet />
          </div>
        </ExportProvider>
      </CollectionProvider>
    </DashboardProvider>
    <ToastPrimitive.Viewport />
  </ToastPrimitive.Provider>
)
