import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, PropsWithChildren } from 'react'
import { IconButton } from '.'

export type ModalProps = PropsWithChildren<{
  /**
   * Whether the modal is open or not.
   */
  open: boolean
  /**
   * Callback to set the open state.
   */
  setOpen: (open: boolean) => void
  /**
   * Optional callback for when the modal is closed from the close button or clicking the overlay.
   */
  onClose?: () => void
}>

export const Modal = ({ open, setOpen, onClose, children }: PropsWithChildren<ModalProps>) => {
  const handleClose = () => {
    onClose?.()
    setOpen(false)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="text relative z-30" onClose={handleClose}>
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
          <div className="fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity" />
        </Transition.Child>

        {/* Modal container */}
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
              {/* Modal content */}
              <Dialog.Panel className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800">
                <IconButton
                  variant="ghost"
                  size="xs"
                  onClick={handleClose}
                  className="absolute right-4 top-4"
                >
                  <XMarkIcon className="h-5 w-5" />
                </IconButton>
                <main>{children}</main>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const Header = ({ children }: PropsWithChildren) => (
  <header>
    <Dialog.Title as="h3" className="mb-5 text-xl font-semibold leading-6">
      {children}
    </Dialog.Title>
  </header>
)

const Footer = ({ children }: PropsWithChildren) => (
  <footer className="mt-8 flex flex-row-reverse gap-2">{children}</footer>
)

Modal.Header = Header
Modal.Footer = Footer
