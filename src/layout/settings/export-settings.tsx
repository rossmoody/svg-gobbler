import { Category } from './category'

export const ExportSettings = () => {
  return (
    <Category title="Export" description="Default configuration settings for exporting SVGs.">
      <div className="sm:max-w-xl sm:grid-cols-6 md:col-span-2">
        <h3 className="text-base font-semibold leading-7">Keyboard shortcut</h3>
        <p className="text-muted mt-1 text-sm leading-6">Export settings.</p>
      </div>
    </Category>
  )
}
