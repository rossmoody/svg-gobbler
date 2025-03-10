// Toast.tsx
import * as RToast from '@radix-ui/react-toast'
import clsx from 'clsx'
import { FC } from 'react'

export type ToastComponentProps = {
  actionText?: string
  className?: string
  description: string
  onAction?: () => void
  onSecondaryAction?: () => void
  open: boolean
  secondaryActionText?: string
  title: string
}

export const Toast: FC<ToastComponentProps> = ({
  actionText,
  description,
  onAction,
  onSecondaryAction,
  open,
  secondaryActionText,
  title,
}) => {
  return (
    <RToast.Root
      className={clsx(
        'bottom-6 right-6 w-auto md:left-auto md:w-full md:max-w-sm',
        'fixed inset-x-4 rounded-lg bg-white shadow-lg dark:bg-gray-800',
        'radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right',
        'radix-state-closed:animate-toast-hide',
        'radix-swipe-direction-right:radix-swipe-end:animate-toast-swipe-out-x',
        'radix-swipe-direction-right:translate-x-radix-toast-swipe-move-x',
        'radix-swipe-direction-down:radix-swipe-end:animate-toast-swipe-out-y',
        'radix-swipe-direction-down:translate-y-radix-toast-swipe-move-y',
        'radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]',
        'focus:outline-none focus-visible:ring focus-visible:ring-red-500',
      )}
      open={open}
    >
      <div className="flex">
        <div className="flex w-0 flex-1 items-center py-4 pl-5">
          <div className="radix w-full">
            <RToast.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {title}
            </RToast.Title>
            <RToast.Description className="mt-1 text-sm text-gray-700 dark:text-gray-400">
              {description}
            </RToast.Description>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col space-y-1 px-3 py-2">
            {actionText && onAction && (
              <div className="flex h-0 flex-1">
                <RToast.Action
                  altText={actionText}
                  className="flex w-full items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-red-600 hover:bg-gray-50 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 dark:text-red-500 dark:hover:bg-gray-900"
                  onClick={onAction}
                >
                  {actionText}
                </RToast.Action>
              </div>
            )}
            {secondaryActionText && onSecondaryAction && (
              <div className="flex h-0 flex-1">
                <RToast.Action
                  altText={secondaryActionText}
                  className="flex w-full items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm font-medium hover:bg-gray-50 focus:z-10 focus:outline-none focus-visible:ring dark:hover:bg-gray-900"
                  onClick={onSecondaryAction}
                >
                  {secondaryActionText}
                </RToast.Action>
              </div>
            )}
          </div>
        </div>
      </div>
    </RToast.Root>
  )
}
