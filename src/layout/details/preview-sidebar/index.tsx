import { useResize } from '../use-resize'
import { PreviewSvg } from './preview-svg'

export const PreviewSidebar = () => {
  const { ref, width } = useResize()

  return (
    <aside
      className="relative shrink-0 border-l border-gray-200 dark:border-gray-800"
      style={{ width }}
      ref={ref}
    >
      <div className="h-full">
        <PreviewSvg />
      </div>
      <div className="absolute inset-y-1/2 -left-2 z-50 h-12 w-1 cursor-nwse-resize rounded bg-gray-500/40" />
    </aside>
  )
}
