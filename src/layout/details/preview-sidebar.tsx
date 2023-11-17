import { useResize } from 'src/hooks/use-resize'

export const PreviewSidebar = () => {
  const { width, ref } = useResize()

  return (
    <aside
      className="relative border-l border-gray-200 dark:border-gray-800"
      style={{ width }}
      ref={ref}
    >
      <div className="h-full overflow-y-auto">
        {Array.from({ length: 300 }).map((_, i) => (
          <div key={i} className="h-14 border-b border-gray-200 dark:border-gray-800">
            <div className="flex h-14 items-center justify-center">Export</div>
          </div>
        ))}
      </div>
      <div className="absolute inset-y-1/2 -left-2 h-12 w-1 cursor-nwse-resize rounded bg-gray-500/20" />
    </aside>
  )
}
