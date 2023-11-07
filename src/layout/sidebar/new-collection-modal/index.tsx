import { Transition } from '@headlessui/react'
import { DocumentCheckIcon, DocumentPlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Modal } from 'src/components'
import { useSubmitForm } from './use-submit-form'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const NewCollectionModal = ({ setOpen, open }: Props) => {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
  const onSubmitForm = useSubmitForm(acceptedFiles)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/svg+xml': ['.svg'] },
    maxSize: 10 * 1024 * 1024,
    multiple: true,
    onDropAccepted: (files) => {
      setAcceptedFiles((prevFiles) => [...prevFiles, ...files])
    },
  })

  function onClose() {
    setAcceptedFiles([])
    setOpen(false)
  }

  return (
    <Modal open={open} setOpen={setOpen} onClose={onClose}>
      <Modal.Header>Create a new collection</Modal.Header>
      <form onSubmit={onSubmitForm}>
        <Modal.Content>
          <label className="label">
            Name
            <input name="name" className="input" type="text" required />
          </label>
          <div
            {...getRootProps()}
            className={clsx(
              'relative mt-4 rounded-lg border-2 border-dashed border-gray-500/25 min-h-[220px]',
              'hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer focus',
              isDragActive && 'bg-gray-50 dark:bg-gray-900',
            )}
          >
            {/* Upload Content */}
            <Transition
              as="div"
              show={acceptedFiles.length < 1}
              enter="transition-all duration-300 ease-in-out"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="transition-all duration-300 ease-in-out"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-70"
              className="absolute inset-0 flex flex-col items-center justify-center"
              unmount={false}
            >
              <DocumentPlusIcon className="mx-auto h-12 w-12 text-muted mb-3" aria-hidden="true" />
              <div className="flex text-sm leading-6 text">
                <label className="cursor-pointer rounded-md font-semibold text-red-600">
                  <span>Upload files</span>
                  <input className="sr-only" {...getInputProps()} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5">SVG files up to 10mb</p>
            </Transition>
            {/* Content Uploaded */}
            <Transition
              as="div"
              show={acceptedFiles.length > 0}
              enter="transition-all duration-300 ease-in-out delay-150"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="transition-all duration-300 ease-in-out"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <DocumentCheckIcon className="mx-auto h-12 w-12 text-muted mb-3" aria-hidden="true" />
              <span className="text-sm leading-5 text-gray-500 dark:text-gray-400">
                {acceptedFiles.length} item{acceptedFiles.length > 1 && 's'} uploaded
              </span>
            </Transition>
          </div>
        </Modal.Content>
        <Modal.Footer>
          <Button size="lg" type="submit">
            Create collection
          </Button>
          <Button size="lg" variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
