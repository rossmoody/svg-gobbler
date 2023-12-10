import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import { Button } from '.'

export const ErrorState = () => (
  <div className="flex h-full w-full items-center justify-center p-12">
    <div className="text-center">
      <ExclamationTriangleIcon aria-hidden={true} className="mx-auto h-12 w-12" />
      <h3 className="mt-3 text-sm font-semibold">Oops! There was an error</h3>
      <p className="mt-1 text-sm">Try refreshing the page or navigating back to the home page</p>
      <div className="mt-6 flex justify-center">
        <Button
          onClick={() => {
            window.location.reload()
          }}
          size="lg"
        >
          Refresh
        </Button>
      </div>
    </div>
  </div>
)
