import { useResize } from 'src/hooks/use-resize'

export const ExportSidebar = () => {
  const { ref, width } = useResize()

  return (
    <aside
      ref={ref}
      style={{ width }}
      className="relative z-10 border-r border-gray-200 dark:border-gray-800"
    >
      <div className="h-full overflow-y-auto">Export</div>
      <div className="absolute inset-y-0 right-0 z-50 w-[1px] cursor-ew-resize hover:bg-gray-200" />
      <div className="absolute inset-y-1/2 -left-2 z-50 h-12 w-1 cursor-ew-resize rounded bg-gray-500/30" />
    </aside>
  )
}
