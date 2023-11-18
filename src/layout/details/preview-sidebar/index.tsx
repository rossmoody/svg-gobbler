import { useResize } from 'src/hooks/use-resize'
import { PreviewSvg } from './preview-svg'

export const PreviewSidebar = () => {
  const { ref, width } = useResize()

  return (
    <aside
      ref={ref}
      style={{ width }}
      className="relative z-10 border-l border-gray-200 dark:border-gray-800"
    >
      <div className="h-full">
        <PreviewSvg />
      </div>
      <div className="absolute inset-y-1/2 -left-2 z-50 h-12 w-1 cursor-ew-resize rounded bg-gray-500/30" />
      <div className="absolute inset-y-0 left-0 z-50 w-[1px] cursor-ew-resize hover:bg-red-100" />
    </aside>
  )
}
