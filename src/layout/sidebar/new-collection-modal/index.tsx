import { Dialog, Transition } from '@headlessui/react'
import { DocumentCheckIcon, DocumentPlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { Button, IconButton } from 'src/components'
import { useSubmitForm } from './use-submit-form'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const NewCollectionModal = ({ setOpen, open }: Props) => {
  const onSubmitForm = useSubmitForm()
  const [fileQty, setFileQty] = useState(0)

  function onClose() {
    setOpen(false)
    setFileQty(0)
  }

  async function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
    setFileQty(event.target.files?.length ?? 0)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={onClose} unmount>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        {/* Modal Frame */}
        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {/* Modal Panel */}
              <Dialog.Panel className="relative overflow-hidden rounded-2xl surface p-6 shadow-2xl w-full max-w-lg">
                <form onSubmit={onSubmitForm}>
                  <header className="mb-6">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6">
                      Create new collection
                    </Dialog.Title>
                    <div className="absolute top-0 right-0 pt-4 pr-4">
                      <IconButton variant="ghost" size="xs" onClick={onClose}>
                        <XMarkIcon className="w-5 h-5" />
                      </IconButton>
                    </div>
                  </header>

                  <main>
                    <label className="label">
                      Name
                      <input name="name" className="input" type="text" required />
                    </label>
                    <div className="relative mt-4 rounded-lg border-2 border-dashed border-gray-500/25 min-h-[220px]">
                      {/* Upload Content */}
                      <Transition
                        as="div"
                        show={fileQty < 1}
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
                          className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-3"
                          aria-hidden="true"
                        />
                        <div className="flex text-sm leading-6 text-gray-600">
                          <label className="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500">
                            <span>Upload files</span>
                            <input
                              onChange={onUpload}
                              name="files"
                              type="file"
                              className="sr-only"
                              accept=".svg"
                              multiple
                            />
                          </label>
                          <p className="pl-1 text-muted">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-muted">SVG files up to 10mb</p>
                      </Transition>
                      {/* Content Uploaded */}
                      <Transition
                        as="div"
                        show={fileQty > 0}
                        enter="transition-all duration-300 ease-in-out delay-150"
                        enterFrom="opacity-0 scale-90"
                        enterTo="opacity-100 scale-100"
                        leave="transition-all duration-300 ease-in-out"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className="absolute inset-0 flex flex-col items-center justify-center"
                      >
                        <DocumentCheckIcon
                          className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-3"
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-5 text-gray-500 dark:text-gray-600">
                          {fileQty} item{fileQty > 1 && 's'} uploaded
                        </span>
                      </Transition>
                    </div>
                  </main>

                  <footer className="mt-8 flex flex-row-reverse gap-2">
                    <Button size="lg" type="submit">
                      Create collection
                    </Button>
                    <Button size="lg" variant="secondary" onClick={onClose} type="button">
                      Cancel
                    </Button>
                  </footer>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
