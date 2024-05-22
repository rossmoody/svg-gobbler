import { loc } from 'src/utils/i18n'

import { ExportDetailFooter } from './footer'
import { ExportDetailMain } from './main'
import { useExportResize } from './use-export-resize'

export const ExportSidebar = () => {
  const { ref, width } = useExportResize()

  return (
    <aside
      className="relative z-10 border-r border-gray-200 dark:border-gray-800"
      ref={ref}
      style={{ width }}
    >
      <div className="flex h-full flex-col">
        <div className="flex-grow overflow-y-auto px-3 pt-2">
          <header className="mb-4">
            <h2 className="mt-2 text-sm font-medium">{loc('details_settings')}</h2>
          </header>
          <ExportDetailMain />
        </div>
        <ExportDetailFooter />
      </div>
      <div className="absolute inset-y-0 right-0 z-50 w-px cursor-ew-resize" />
      <div className="absolute inset-y-1/2 -right-2 z-50 h-12 w-1 cursor-ew-resize rounded bg-gray-500/50" />
    </aside>
  )
}
