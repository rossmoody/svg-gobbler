import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Button } from '.'

export function EmptyState() {
  return (
    <div className="flex items-center justify-center w-full h-full rounded-lg border-2 border-dashed border-gray-300 p-12">
      <div className="text-center">
        <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden={true} />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No SVGs found</h3>
        <p className="mt-1 text-sm text-gray-500">
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
