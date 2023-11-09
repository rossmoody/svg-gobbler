import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Tooltip } from 'src/components'

export const CardSelect = () => {
  return (
    <div className="opacity-0 absolute top-4 right-4 group-hover:opacity-100 transition-all duration-300 ease-in-out cursor-help">
      <Tooltip content="This SVG is restricted from cross-origin resource sharing and can't be edited or exported from SVG Gobbler.">
        <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
      </Tooltip>
    </div>
  )
}
