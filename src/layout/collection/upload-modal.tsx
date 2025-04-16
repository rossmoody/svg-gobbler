import { Transition } from '@headlessui/react'
import { DocumentCheckIcon, DocumentPlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { nanoid } from 'nanoid'
import { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Modal, ModalProps, Tabs } from 'src/components'
import { useUpload } from 'src/hooks'
import { type UserState, useUser } from 'src/providers'
import { FormUtils } from 'src/utils/form-utils'
import { loc } from 'src/utils/i18n'
import { StorageUtils } from 'src/utils/storage-utils'

export const UploadModal = ({ open, setOpen }: ModalProps) => {
  const [error, setError] = useState(false)
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
  const reference = useRef<HTMLTextAreaElement>(null)
  const upload = useUpload()
  const { dispatch, state } = useUser()

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: { 'image/svg+xml': ['.svg'] },
    maxSize: 10 * 1024 * 1024,
    multiple: true,
    onDropAccepted: (files) => {
      setAcceptedFiles((previousFiles) => [...previousFiles, ...files])
    },
  })

  async function onSubmit() {
    const clipboardValue = reference.current?.value

    // Early return if there's a clipboard value and it's invalid
    if (clipboardValue && !FormUtils.isValidSVG(clipboardValue)) {
      return setError(true)
    }

    // Set the onboarding flag if the user pastes an SVG
    if (clipboardValue) {
      const payload: UserState = {
        ...state,
        onboarding: { ...state.onboarding, hasPastedSvg: true },
      }
      StorageUtils.setStorageData('user', payload)
      dispatch({ payload, type: 'set-user' })
    }

    // Determine the source of files
    const svgFiles = clipboardValue
      ? [{ name: nanoid(), svg: clipboardValue }]
      : await FormUtils.handleUpload(acceptedFiles)

    // Perform the upload and clear states
    await upload(svgFiles)
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
    <Modal onClose={onClose} open={open} setOpen={setOpen}>
      <Modal.Header>{loc('upload_upload')}</Modal.Header>
      <Tabs.Group>
        <Tabs.List>
          <Tabs.Tab>{loc('upload_file')}</Tabs.Tab>
          <Tabs.Tab>{loc('upload_clipboard')}</Tabs.Tab>
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
                <DocumentPlusIcon
                  aria-hidden="true"
                  className="text-muted mx-auto mb-3 h-12 w-12"
                />
                <div className="text flex text-sm leading-6">
                  <span className="font-semibold text-red-600 dark:text-red-500">
                    {loc('upload_upload_files')}
                  </span>
                  <input className="sr-only" {...getInputProps()} />
                  <p className="pl-1">{loc('upload_drag_files')}</p>
                </div>
                <p className="text-xs leading-5">{loc('upload_file_limit')}</p>
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
                <DocumentCheckIcon
                  aria-hidden="true"
                  className="text-muted mx-auto mb-3 h-12 w-12"
                />
                <span className="text text-sm font-medium leading-5">
                  {acceptedFiles.length} {loc('upload_item')}
                  {acceptedFiles.length > 1 && 's'} {loc('upload_uploaded')}
                </span>
              </Transition>
            </div>
          </Tabs.Panel>

          {/* Clipboard */}
          <Tabs.Panel>
            <textarea
              className={clsx('input mt-4 h-52', error && 'input-invalid')}
              onFocus={() => setError(false)}
              ref={reference}
            />
            {error && (
              <span
                aria-live="polite"
                className="block pt-2 text-xs text-red-600 dark:text-red-400"
              >
                {loc('upload_error')}
              </span>
            )}
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs.Group>
      <Modal.Footer>
        <Button onClick={onSubmit} size="lg">
          {loc('upload_upload')}
        </Button>
        <Button onClick={onClose} size="lg" type="button" variant="secondary">
          {loc('main_cancel')}
        </Button>
      </Modal.Footer>
      <span id="upload-modal" />
    </Modal>
  )
}
