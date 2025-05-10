import { Transition } from '@headlessui/react'
import { DocumentCheckIcon, DocumentPlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Modal } from 'src/components'
import { loc } from 'src/utilities/i18n'

import { useCreateCollection } from './use-create-collection'

type Properties = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const NewCollectionModal = ({ open, setOpen }: Properties) => {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
  const onSubmitForm = useCreateCollection(acceptedFiles)

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: { 'image/svg+xml': ['.svg'] },
    maxSize: 10 * 1024 * 1024,
    multiple: true,
    onDropAccepted: (files) => {
      setAcceptedFiles((previousFiles) => [...previousFiles, ...files])
    },
  })

  function onClose() {
    setOpen(false)
    setTimeout(() => setAcceptedFiles([]), 300)
  }

  return (
    <Modal onClose={onClose} open={open} setOpen={setOpen}>
      <Modal.Header>{loc('sidebar_create_new')}</Modal.Header>
      <form onSubmit={onSubmitForm}>
        <Modal.Main>
          <label className="label" htmlFor="name">
            {loc('sidebar_name')}
          </label>
          <input className="input" id="name" name="name" required type="text" />
          <div
            {...getRootProps()}
            className={clsx(
              'relative mt-4 min-h-[220px] rounded-lg border-2 border-dashed border-gray-500/25',
              'focus cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50',
              isDragActive && 'ring-2 ring-red-600/50 dark:ring-red-500/50',
            )}
          >
            {/* Upload Content */}
            <Transition
              as="div"
              className="absolute inset-0 flex flex-col items-center justify-center"
              enter="transition-all duration-300 ease-in-out"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="transition-all duration-300 ease-in-out"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-70"
              show={acceptedFiles.length === 0}
              unmount={false}
            >
              <DocumentPlusIcon aria-hidden="true" className="text-muted mx-auto mb-3 h-12 w-12" />
              <div className="text flex text-sm leading-6">
                <span className="font-semibold text-red-600 dark:text-red-500">
                  {loc('sidebar_upload_files')}
                </span>
                <input className="sr-only" {...getInputProps()} />
                <p className="pl-1">{loc('sidebar_drag_files')}</p>
              </div>
              <p className="text-xs leading-5">{loc('sidebar_file_limit')}</p>
            </Transition>
            {/* Content Uploaded */}
            <Transition
              as="div"
              className="absolute inset-0 flex flex-col items-center justify-center"
              enter="transition-all duration-300 ease-in-out delay-150"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="transition-all duration-300 ease-in-out"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              show={acceptedFiles.length > 0}
            >
              <DocumentCheckIcon aria-hidden="true" className="text-muted mx-auto mb-3 h-12 w-12" />
              <span className="text text-sm font-medium leading-5">
                {acceptedFiles.length} {loc('sidebar_item')}
                {acceptedFiles.length > 1 && 's'} {loc('sidebar_uploaded')}
              </span>
            </Transition>
          </div>
        </Modal.Main>
        <Modal.Footer>
          <Button size="lg" type="submit">
            {loc('sidebar_create_collection')}
          </Button>
          <Button onClick={onClose} size="lg" type="button" variant="secondary">
            {loc('sidebar_cancel')}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
