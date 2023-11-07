import { Transition } from '@headlessui/react'
import { DocumentCheckIcon, DocumentPlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Modal, ModalProps, Tabs } from 'src/components'
import { useUpload } from 'src/hooks/use-upload'
import { FormUtils } from 'src/utils/form-utils'

export const UploadModal = ({ open, setOpen }: ModalProps) => {
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
      alert('Invalid SVG string')
      return
    }

    // Determine the source of files
    const files = clipboardValue ? [clipboardValue] : await FormUtils.handleUpload(acceptedFiles)

    // Perform the upload and clear states
    await upload(files)
    setOpen(false)

    // Reset accepted files state with a delay
    setTimeout(() => setAcceptedFiles([]), 300)
  }

  return (
    <Modal open={open} setOpen={setOpen}>
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
                'relative mt-4 rounded-lg border-2 border-dashed border-gray-500/25 min-h-[220px]',
                'hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer focus',
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
                  className="mx-auto h-12 w-12 text-muted mb-3"
                  aria-hidden="true"
                />
                <div className="flex text-sm leading-6 text">
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
                  className="mx-auto h-12 w-12 text-muted mb-3"
                  aria-hidden="true"
                />
                <span className="text-sm leading-5 text font-medium">
                  {acceptedFiles.length} item{acceptedFiles.length > 1 && 's'} uploaded
                </span>
              </Transition>
            </div>
          </Tabs.Panel>

          {/* Clipboard */}
          <Tabs.Panel>
            <textarea className="input mt-4 h-52" ref={ref} />
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs.Group>
      <Modal.Footer>
        <Button size="lg" onClick={onSubmit}>
          Upload
        </Button>
        <Button size="lg" variant="secondary" onClick={() => setOpen(false)} type="button">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
