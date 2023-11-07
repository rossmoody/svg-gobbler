import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useUpload } from 'src/hooks/use-upload'
import { UploadModal } from 'src/layout/collection/upload-modal'
import { FormUtils } from 'src/utils/form-utils'
import { Button } from '.'

/**
 * This is displayed when there are no SVGs found sourcing the client page.
 * It is also rendered when the user has deleted all SVGs from the collection.
 */
export const EmptyState = () => {
  const [open, setOpen] = useState(false)
  const upload = useUpload()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/svg+xml': ['.svg'] },
    maxSize: 10 * 1024 * 1024,
    multiple: true,
    noKeyboard: true,
    noClick: true,
    onDropAccepted,
  })

  async function onDropAccepted(files: File[]) {
    const svgStrings = await FormUtils.handleUpload(files)
    upload(svgStrings)
  }

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'flex items-center justify-center w-full h-full rounded-3xl border-2',
        'border-dashed border-gray-200 dark:border-gray-700/50 p-12 bg-white/70 dark:bg-gray-800/40',
        isDragActive &&
          'ring-4 ring-red-600/50 dark:ring-red-500/50 scale-[1.01] transition-all duration-300',
      )}
    >
      <div className="text-center">
        <MagnifyingGlassIcon className="mx-auto h-12 w-12 mb-3 text-muted" aria-hidden={true} />
        <h3 className="mt-2 text-lg font-semibold mb-2">No SVGs found</h3>
        <p className="mt-1 text-sm text-muted">
          Select or drag SVGs into this area to upload into this collection
        </p>
        <div className="mt-6 flex justify-center">
          <Button size="lg" onClick={() => setOpen(true)}>
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Upload SVG
          </Button>
        </div>
      </div>
      <input {...getInputProps()} className="sr-only" />
      <UploadModal open={open} setOpen={setOpen} />
    </div>
  )
}
