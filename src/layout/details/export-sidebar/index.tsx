import { useResize } from 'src/hooks'
import { ExportDetailFooter } from './footer'
import { ExportDetailHeader } from './header'
import { ExportDetailMain } from './main'

export const ExportSidebar = () => {
  const { ref, width } = useResize()

  return (
    <aside
      ref={ref}
      style={{ width }}
      className="relative z-10 border-r border-gray-200 dark:border-gray-800"
    >
      <div className="flex h-full flex-col">
        <div className="flex-grow overflow-y-auto px-3 pt-2">
          <ExportDetailHeader />
          <ExportDetailMain />
        </div>
        <ExportDetailFooter />
      </div>
      <div className="absolute inset-y-0 right-0 z-50 w-[1px] cursor-ew-resize hover:bg-gray-200" />
      <div className="absolute inset-y-1/2 -right-2 z-50 h-12 w-1 cursor-ew-resize rounded bg-gray-500/50" />
    </aside>
  )
}
