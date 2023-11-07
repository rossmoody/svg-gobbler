import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Button } from '.'

/**
 * This is displayed when there are no SVGs found sourcing the client page.
 * It is also rendered when the user has deleted all SVGs from the collection.
 */
export const EmptyState = () => {
  return (
    <div className="flex items-center justify-center w-full h-full rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-600 p-12 bg-white/70 dark:bg-gray-800/70">
      <div className="text-center">
        <MagnifyingGlassIcon className="mx-auto h-12 w-12 mb-3 text-muted" aria-hidden={true} />
        <h3 className="mt-2 text-lg font-semibold mb-2">No SVGs found</h3>
        <p className="mt-1 text-sm text-muted">
          Select or drag SVGs into this area to upload into this collection
        </p>
        <div className="mt-6 flex justify-center">
          <Button size="lg">
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Upload SVG
          </Button>
        </div>
      </div>
    </div>
  )
}
