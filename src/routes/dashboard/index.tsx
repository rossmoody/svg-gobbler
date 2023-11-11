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
          <div className="lg:pl-72 transition-all relative overflow-hidden min-h-screen">
            <Outlet />
          </div>
        </ExportProvider>
      </CollectionProvider>
    </DashboardProvider>
    <ToastPrimitive.Viewport />
  </ToastPrimitive.Provider>
)
