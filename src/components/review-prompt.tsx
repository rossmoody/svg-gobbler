import * as Toast from '@radix-ui/react-toast'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { links } from 'src/constants/links'
import { useDashboard, useUser } from 'src/providers'
import { loc } from 'src/utils/i18n'
import { StorageUtils } from 'src/utils/storage-utils'

export const ReviewPrompt = () => {
  const [show, setShow] = useState(false)
  const { dispatch, state: userState } = useUser()

  const {
    state: { collections },
  } = useDashboard()

  useEffect(() => {
    if (collections.length >= 3 && !userState.onboarding.viewedReview) {
      setShow(true)
    }
  }, [collections.length, userState.onboarding.viewedReview])

  const setReviewPromptViewed = () => {
    const payload = { ...userState, onboarding: { ...userState.onboarding, viewedReview: true } }
    StorageUtils.setStorageData('user', payload)
    dispatch({ payload, type: 'set-user' })
    setShow(false)
  }

  const handleReviewPrompt = () => {
    setReviewPromptViewed()
    window.open(links.chromeWebstore, '_blank')
  }

  return (
    <Toast.Provider>
      <Toast.Root
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
        open={show}
      >
        <div className="flex">
          <div className="flex w-0 flex-1 items-center py-4 pl-5">
            <div className="radix w-full">
              <Toast.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {loc('review_title')} 👋
              </Toast.Title>
              <Toast.Description className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                {loc('review_desc')}
              </Toast.Description>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col space-y-1 px-3 py-2">
              <div className="flex h-0 flex-1">
                <Toast.Action
                  altText="Review"
                  className="flex w-full items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-red-600 hover:bg-gray-50 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 dark:text-red-500 dark:hover:bg-gray-900"
                  onClick={handleReviewPrompt}
                >
                  {loc('review_primary_action')}
                </Toast.Action>
              </div>
              <div className="flex h-0 flex-1">
                <Toast.Action
                  altText="Dismiss"
                  className="flex w-full items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm font-medium hover:bg-gray-50 focus:z-10 focus:outline-none focus-visible:ring dark:hover:bg-gray-900"
                  onClick={setReviewPromptViewed}
                >
                  {loc('review_secondary_action')}
                </Toast.Action>
              </div>
            </div>
          </div>
        </div>
      </Toast.Root>
      <Toast.Viewport className="toast-viewport" />
    </Toast.Provider>
  )
}
