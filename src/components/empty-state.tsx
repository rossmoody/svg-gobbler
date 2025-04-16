import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useUpload } from 'src/hooks'
import { UploadModal } from 'src/layout/collection/upload-modal'
import { FormUtilities } from 'src/utilities/form-utilities'

import { Button } from '.'
import { loc } from '../utilities/i18n'

/**
 * This is displayed when there are no SVGs found sourcing the client page.
 * It is also rendered when the user has deleted all SVGs from the collection.
 */
export const EmptyState = () => {
  const [open, setOpen] = useState(false)
  const upload = useUpload()

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: { 'image/svg+xml': ['.svg'] },
    maxSize: 10 * 1024 * 1024,
    multiple: true,
    noClick: true,
    noKeyboard: true,
    onDropAccepted,
  })

  async function onDropAccepted(files: File[]) {
    const fileSvgs = await FormUtilities.handleUpload(files)
    upload(fileSvgs)
  }

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'flex h-full w-full items-center justify-center rounded-3xl border-2',
        'border-dashed border-gray-200 bg-white/70 p-12 dark:border-gray-700/50 dark:bg-gray-800/40',
        isDragActive &&
          'scale-[1.002] ring-4 ring-red-600/50 transition-all duration-300 dark:ring-red-500/50',
      )}
    >
      <div className="text-center">
        <MagnifyingGlassIcon aria-hidden={true} className="text-muted mx-auto mb-3 h-12 w-12" />
        <h3 className="mb-2 mt-2 text-lg font-semibold">{loc('empty_title')}</h3>
        <p className="text-muted mt-1 text-sm">{loc('empty_desc')}</p>
        <div className="mt-6 flex justify-center">
          <Button onClick={() => setOpen(true)} size="lg">
            <PlusIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
            {loc('empty_action')}
          </Button>
        </div>
      </div>
      <input {...getInputProps()} className="sr-only" />
      <UploadModal open={open} setOpen={setOpen} />
    </div>
  )
}
