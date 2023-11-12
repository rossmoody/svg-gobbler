import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { FileType, fileTypes, useCollection, useExport } from 'src/providers'
import { Footer } from './footer'
import { Header } from './header'
import { SvgSettings } from './svg-settings'

const transitionConfig = {
  enter: 'transition-all duration-500',
  enterFrom: 'opacity-0 transform translate-y-4',
  enterTo: 'opacity-100 transform translate-y-0',
  leave: 'transition-all duration-500',
  leaveFrom: 'opacity-100 transform translate-y-0',
  leaveTo: 'opacity-0 transform translate-y-4',
  className: 'absolute inset-0',
}

export const ExportPanel = () => {
  const { state: collectionState } = useCollection()
  const { state: exportState, dispatch: exportDispatch } = useExport()

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    exportDispatch({ type: 'set-file-type', payload: e.target.value as FileType })
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
            <div className="relative">
              <Transition as="div" show={exportState.fileType === 'svg'} {...transitionConfig}>
                <SvgSettings />
              </Transition>
              <Transition as="div" show={exportState.fileType === 'jpg'} {...transitionConfig}>
                JPG
              </Transition>
              <Transition as="div" show={exportState.fileType === 'png'} {...transitionConfig}>
                PNG
              </Transition>
            </div>
          </div>
          <Footer />
        </div>
      </aside>
    </Transition>
  )
}
