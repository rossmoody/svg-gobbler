import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { FileType, fileTypes, useCollection, useExport } from 'src/providers'
import { Footer } from './footer'
import { Header } from './header'

export const ExportPanel = () => {
  const { state } = useCollection()
  const { state: exportState, dispatch: exportDispatch } = useExport()

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    exportDispatch({ type: 'set-file-type', payload: e.target.value as FileType })
  }

  const handleOptimizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    exportDispatch({ type: 'set-optimize-exports', payload: e.target.checked })
  }

  return (
    <Transition
      show={state.selected.length > 0}
      enter="transition-all duration-500"
      enterFrom="opacity-0 w-[0]"
      enterTo="opacity-100 w-[18rem]"
      leave="transition-all duration-500"
      leaveFrom="opacity-100 w-[18rem]"
      leaveTo="opacity-0 w-[0]"
    >
      <aside
        className={clsx(
          'border-l shrink-0 overflow-y-auto h-[calc(100dvh-theme(space.16))] surface',
          'transition-width duration-500 ease-in border-gray-200 dark:border-gray-800',
        )}
      >
        <div className="flex flex-col px-4 pb-4 pt-2 h-full">
          <Header />
          <div className="flex-grow">
            <label className="block" htmlFor="file-type">
              File type
            </label>
            <select
              className="mb-5 flex"
              id="file-type"
              value={exportState.fileType}
              onChange={handleTypeChange}
            >
              {fileTypes.map((type) => (
                <option key={type} value={type}>
                  {type.toUpperCase()}
                </option>
              ))}
            </select>
            <h2 className="font-medium text-sm my-3">Settings</h2>
            <div className="flex gap-0_5">
              <input
                id="optimize"
                className="checkbox"
                type="checkbox"
                checked={exportState.optimizeExports}
                onChange={handleOptimizeChange}
              />
              <label htmlFor="optimize" className="export-label">
                Optimize exports
              </label>
            </div>
          </div>
          <Footer />
        </div>
      </aside>
    </Transition>
  )
}
