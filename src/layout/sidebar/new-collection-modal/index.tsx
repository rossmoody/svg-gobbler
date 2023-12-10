import { Transition } from '@headlessui/react'
import { DocumentCheckIcon, DocumentPlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Modal } from 'src/components'

import { useCreateCollection } from './use-create-collection'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const NewCollectionModal = ({ open, setOpen }: Props) => {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
  const onSubmitForm = useCreateCollection(acceptedFiles)

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: { 'image/svg+xml': ['.svg'] },
    maxSize: 10 * 1024 * 1024,
    multiple: true,
    onDropAccepted: (files) => {
      setAcceptedFiles((prevFiles) => [...prevFiles, ...files])
    },
  })

  function onClose() {
    setOpen(false)
    setTimeout(() => setAcceptedFiles([]), 300)
  }

  return (
    <Modal onClose={onClose} open={open} setOpen={setOpen}>
      <Modal.Header>Create a new collection</Modal.Header>
      <form onSubmit={onSubmitForm}>
        <label className="label" htmlFor="name">
          Name
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
            show={acceptedFiles.length < 1}
            unmount={false}
          >
            <DocumentPlusIcon aria-hidden="true" className="text-muted mx-auto mb-3 h-12 w-12" />
            <div className="text flex text-sm leading-6">
              <span className="font-semibold text-red-600 dark:text-red-500">Upload files</span>
              <input className="sr-only" {...getInputProps()} />
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5">SVG files up to 10mb</p>
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
              {acceptedFiles.length} item{acceptedFiles.length > 1 && 's'} uploaded
            </span>
          </Transition>
        </div>

        <Modal.Footer>
          <Button size="lg" type="submit">
            Create collection
          </Button>
          <Button onClick={onClose} size="lg" type="button" variant="secondary">
            Cancel
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
