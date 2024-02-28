import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { FileType, fileTypes, useCollection, useExport } from 'src/providers'

import { Filename } from './file-name'
import { Footer } from './footer'
import { Header } from './header'
import { JpegSettings } from './jpeg-settings'
import { PngSettings } from './png-settings'
import { SvgSettings } from './svg-settings'
import { WebPSettings } from './webp-settings'

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
  const { dispatch: exportDispatch, state: exportState } = useExport()

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    exportDispatch({ payload: e.target.value as FileType, type: 'set-file-type' })
  }

  return (
    <Transition
      enter="transition-all duration-500"
      enterFrom="opacity-0 w-[0]"
      enterTo="opacity-100 w-[18rem]"
      leave="transition-all duration-500"
      leaveFrom="opacity-100 w-[18rem]"
      leaveTo="opacity-0 w-[0]"
      show={collectionState.selected.length > 0}
    >
      <aside
        className={clsx(
          'surface h-[calc(100dvh-theme(space.16))] shrink-0 overflow-y-auto border-l',
          'transition-width border-gray-200 duration-500 ease-in dark:border-gray-800',
        )}
      >
        <div className="flex h-full flex-col px-3 pt-2">
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
                  onChange={handleTypeChange}
                  value={exportState.fileType}
                >
                  {fileTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-5">
                <Filename />
              </div>
              <h2 className="my-3 text-sm font-medium">Settings</h2>
              <div className="relative">
                <Transition as="div" show={exportState.fileType === 'svg'} {...transitionConfig}>
                  <SvgSettings />
                </Transition>
                <Transition as="div" show={exportState.fileType === 'png'} {...transitionConfig}>
                  <PngSettings />
                </Transition>
                <Transition as="div" show={exportState.fileType === 'webp'} {...transitionConfig}>
                  <WebPSettings />
                </Transition>
                <Transition as="div" show={exportState.fileType === 'jpeg'} {...transitionConfig}>
                  <JpegSettings />
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
