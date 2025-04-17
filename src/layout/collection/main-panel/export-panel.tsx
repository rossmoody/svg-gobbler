import { Transition } from '@headlessui/react'
import { forwardRef } from 'react'
import { fileTypeLabels } from 'src/constants/file-type-labels'
import { FileType, fileTypes, useExport } from 'src/providers'
import { loc } from 'src/utilities/i18n'

import { Filename } from './file-name'
import { JpegSettings } from './jpeg-settings'
import { PngSettings } from './png-settings'
import { SpriteSettings } from './sprite-settings'
import { SvgSettings } from './svg-settings'
import { WebPSettings } from './webp-settings'

export const transitionConfig = {
  enter: 'transition-all duration-500 ease-in',
  enterFrom: 'opacity-0 h-0 translate-y-2',
  enterTo: 'opacity-100 h-20 translate-y-0',
  leave: 'transition-all duration-500 ease-out',
  leaveFrom: 'opacity-100 h-20 translate-y-0',
  leaveTo: 'opacity-0 h-0 translate-y-2',
}

export const ExportPanel = forwardRef<HTMLDivElement>((properties, reference) => {
  const { dispatch: exportDispatch, state: exportState } = useExport()

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    exportDispatch({ payload: event.target.value as FileType, type: 'set-file-type' })
  }

  return (
    <div ref={reference} {...properties} className="flex-1 overflow-y-auto p-4">
      <div className="mb-3">
        <label className="export-label" htmlFor="file-type">
          {loc('export_filetype')}
        </label>
        <select
          className="export-select"
          id="file-type"
          onChange={handleTypeChange}
          value={exportState.fileType}
        >
          {fileTypes.map((type) => (
            <option key={type} value={type}>
              {fileTypeLabels[type]}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <Filename />
      </div>
      <h2 className="my-3 text-sm font-medium">{loc('export_settings')}</h2>
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
        <Transition as="div" show={exportState.fileType === 'sprite'} {...transitionConfig}>
          <SpriteSettings />
        </Transition>
      </div>
    </div>
  )
})
