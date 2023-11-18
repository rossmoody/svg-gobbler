import { PreviewSvg } from './preview-svg'

export const PreviewSidebar = () => {
  return (
    <aside className="w-80 border-l border-gray-200 dark:border-gray-800">
      <div className="h-full">
        <PreviewSvg />
      </div>
    </aside>
  )
}
