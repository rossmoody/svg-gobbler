import { ArrowTopRightOnSquareIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { Image } from 'scripts/svg-classes/image'
import { Button, Tooltip } from 'src/components'

type Props = {
  data: Image
}

/**
 * The functionality of a given card when it is cors restricted.
 */
export const CorsRestrictedActions = ({ data }: Props) => {
  const handleOpenInNewTab = () => {
    window.open(data.absoluteImageUrl, '_blank')
  }

  return (
    <div className="z-10">
      {/* Info icon in place of checkbox */}
      <div className="absolute right-3 top-3 cursor-help opacity-0 transition-all duration-300 ease-in-out group-hover/card:opacity-100">
        <Tooltip content="This SVG is restricted from cross-origin resource sharing and can't be edited or exported directly from SVG Gobbler">
          <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
        </Tooltip>
      </div>

      {/* Open in new tab button */}
      <div className="absolute bottom-4 left-4 right-4 opacity-0 transition-all duration-300 ease-in-out group-hover/card:opacity-100">
        <Button
          size="sm"
          className="w-full justify-center bg-white dark:bg-gray-800/40"
          variant="secondary"
          onClick={handleOpenInNewTab}
        >
          Open
          <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
