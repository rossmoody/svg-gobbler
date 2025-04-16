import { DocumentPlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { useUpload } from 'src/hooks'
import { FormUtilities } from 'src/utils/form-utilities'
import { loc } from 'src/utils/i18n'

export const CollectionDropZone = ({ children }: PropsWithChildren) => {
  const upload = useUpload()

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: { 'image/svg+xml': ['.svg'] },
    maxSize: 10 * 1024 * 1024,
    multiple: true,
    noClick: true,
    noKeyboard: true,
    onDrop,
  })

  async function onDrop(acceptedFiles: File[], fileRejections: FileRejection[]) {
    if (acceptedFiles.length > 0) {
      const fileSvgs = await FormUtilities.handleUpload(acceptedFiles)
      upload(fileSvgs)
    }

    if (fileRejections.length > 0) {
      // TODO: Handle file rejections
    }
  }

  return (
    <div {...getRootProps()} className="group">
      <div
        className={clsx(
          'pointer-events-none fixed z-50 flex items-center justify-center',
          isDragActive && 'bottom-0 left-0 right-0 top-28 p-6 lg:left-72',
        )}
      >
        <div
          className={clsx(
            'rounded-2xl shadow-lg transition-all duration-100 ease-in-out',
            'border-2 border-dashed border-red-300/70 ring-0 dark:border-red-500/70',
            'h-full w-full items-center justify-center overflow-hidden bg-white/95 dark:bg-gray-700/95',
            isDragActive ? 'flex' : 'hidden',
          )}
        >
          <div
            className={clsx(
              'flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out',
            )}
          >
            <DocumentPlusIcon aria-hidden="true" className="text-muted mx-auto mb-3 h-12 w-12" />
            <div className="text flex text-sm leading-6">
              <p className="pl-1">
                <span className="font-semibold text-red-600 dark:text-red-500">Drop files</span> to
                upload
              </p>
            </div>
            <p className="text-xs leading-5">{loc('upload_file_limit')}</p>
          </div>
        </div>
      </div>
      <input {...getInputProps()} className="sr-only" />
      {children}
    </div>
  )
}
