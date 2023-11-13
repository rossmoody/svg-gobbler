import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { FileType, fileTypes, useCollection, useExport } from 'src/providers'
import { Footer } from './footer'
import { Header } from './header'
import { PngSettings } from './png-settings'
import { SvgSettings } from './svg-settings'

const transitionConfig = {
  enter: 'transition-all duration-500 ease-in',
  enterFrom: 'opacity-0 h-0 translate-y-2',
  enterTo: 'opacity-100 h-20 translate-y-0',
  leave: 'transition-all duration-500 ease-out',
  leaveFrom: 'opacity-100 h-20 translate-y-0',
  leaveTo: 'opacity-0 h-0 translate-y-2',
}

export const ExportPanel = () => {
  const { state: collectionState } = useCollection()
  const { state: exportState, dispatch: exportDispatch } = useExport()

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    exportDispatch({ type: 'set-file-type', payload: e.target.value as FileType })
  }

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    exportDispatch({ type: 'set-filename', payload: e.target.value })
  }

  return (
    <Transition
      show={collectionState.selected.length > 0}
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
        <div className="flex flex-col px-3 pt-2 h-full">
          <div className="flex-grow overflow-y-auto px-1">
            <Header />
            <main>
              <div className="mb-3">
                <label className="export-label" htmlFor="file-type">
                  File type
                </label>
                <select
                  className="export-select"
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
              </div>
              <div className="mb-5">
                <label className="export-label" htmlFor="file-name">
                  File name
                </label>
                <input
                  id="file-name"
                  type="text"
                  className="export-input"
                  onChange={handleFileNameChange}
                  value={exportState.filename}
                />
              </div>
              <h2 className="font-medium text-sm my-3">Settings</h2>
              <div className="relative">
                <Transition as="div" show={exportState.fileType === 'svg'} {...transitionConfig}>
                  <SvgSettings />
                </Transition>
                <Transition as="div" show={exportState.fileType === 'png'} {...transitionConfig}>
                  <PngSettings />
                </Transition>
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </aside>
    </Transition>
  )
}
