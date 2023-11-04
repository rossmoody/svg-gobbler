import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Button } from '.'

export const ErrorState = () => (
  <div className="flex items-center justify-center w-full h-full p-12">
    <div className="text-center">
      <ExclamationTriangleIcon className="mx-auto h-12 w-12" aria-hidden={true} />
      <h3 className="mt-3 text-sm font-semibold">Oops! There was an error</h3>
      <p className="mt-1 text-sm">Try refreshing the page or navigating back to the home page</p>
      <div className="mt-6 flex justify-center">
        <Button
          size="lg"
          onClick={() => {
            window.location.reload()
          }}
        >
          Refresh
        </Button>
      </div>
    </div>
  </div>
)
