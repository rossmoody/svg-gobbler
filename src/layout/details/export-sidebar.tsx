import { useResize } from 'src/hooks/use-resize'

export const ExportSidebar = () => {
  const { width, ref } = useResize()

  return (
    <aside
      className="relative flex-shrink-0 border-r border-gray-200 dark:border-gray-800"
      style={{ width }}
      ref={ref}
    >
      <div className="h-full overflow-y-auto">Export</div>
      <div className="absolute inset-y-1/2 -right-2 h-12 w-1 cursor-nwse-resize rounded bg-gray-500/20" />
    </aside>
  )
}
