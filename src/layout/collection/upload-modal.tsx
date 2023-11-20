import { Transition } from '@headlessui/react'
import { DocumentCheckIcon, DocumentPlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Modal, ModalProps, Tabs } from 'src/components'
import { useUpload } from 'src/hooks'
import { FormUtils } from 'src/utils/form-utils'

export const UploadModal = ({ open, setOpen }: ModalProps) => {
  const [error, setError] = useState(false)
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
  const ref = useRef<HTMLTextAreaElement>(null)
  const upload = useUpload()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/svg+xml': ['.svg'] },
    maxSize: 10 * 1024 * 1024,
    multiple: true,
    onDropAccepted: (files) => {
      setAcceptedFiles((prevFiles) => [...prevFiles, ...files])
    },
  })

  async function onSubmit() {
    const clipboardValue = ref.current?.value

    // Early return if there's a clipboard value and it's invalid
    if (clipboardValue && !FormUtils.isValidSVG(clipboardValue)) {
      return setError(true)
    }

    // Determine the source of files
    const files = clipboardValue ? [clipboardValue] : await FormUtils.handleUpload(acceptedFiles)

    // Perform the upload and clear states
    await upload(files)
    onClose()
  }

  function onClose() {
    setOpen(false)
    setTimeout(() => {
      setError(false)
      setAcceptedFiles([])
    }, 300)
  }

  return (
    <Modal open={open} setOpen={setOpen} onClose={onClose}>
      <Modal.Header>Upload</Modal.Header>
      <Tabs.Group>
        <Tabs.List>
          <Tabs.Tab>File</Tabs.Tab>
          <Tabs.Tab>Clipboard</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          {/* Files */}
          <Tabs.Panel>
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
                <DocumentPlusIcon
                  className="text-muted mx-auto mb-3 h-12 w-12"
                  aria-hidden="true"
                />
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
                show={acceptedFiles.length > 0}
                enter="transition-all duration-300 ease-in-out delay-150"
                enterFrom="opacity-0 scale-90"
                enterTo="opacity-100 scale-100"
                leave="transition-all duration-300 ease-in-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <DocumentCheckIcon
                  className="text-muted mx-auto mb-3 h-12 w-12"
                  aria-hidden="true"
                />
                <span className="text text-sm font-medium leading-5">
                  {acceptedFiles.length} item{acceptedFiles.length > 1 && 's'} uploaded
                </span>
              </Transition>
            </div>
          </Tabs.Panel>

          {/* Clipboard */}
          <Tabs.Panel>
            <textarea
              className={clsx('input mt-4 h-52', error && 'input-invalid')}
              onFocus={() => setError(false)}
              ref={ref}
            />
            {error && (
              <span
                aria-live="polite"
                className="block pt-2 text-xs text-red-600 dark:text-red-400"
              >
                Invalid SVG, double check the string syntax
              </span>
            )}
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs.Group>
      <Modal.Footer>
        <Button size="lg" onClick={onSubmit}>
          Upload
        </Button>
        <Button size="lg" variant="secondary" onClick={onClose} type="button">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
