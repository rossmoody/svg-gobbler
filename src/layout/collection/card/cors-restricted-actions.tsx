import { ArrowTopRightOnSquareIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { Button, Tooltip } from 'src/components'
import { CardProps } from '.'

/**
 * The functionality of a given card when it is cors restricted.
 */
export const CorsRestrictedActions = ({ data }: Pick<CardProps, 'data'>) => {
  const handleOpenInNewTab = () => {
    window.open(data.corsRestrictedUrl, '_blank')
  }

  return (
    <div className="z-10">
      {/* Info icon in place of checkbox */}
      <div className="opacity-0 absolute top-3 right-3 group-hover/card:opacity-100 transition-all duration-300 ease-in-out cursor-help">
        <Tooltip content="This SVG is restricted from cross-origin resource sharing and can't be edited or exported directly from SVG Gobbler">
          <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
        </Tooltip>
      </div>

      {/* Open in new tab button */}
      <div className="opacity-0 absolute bottom-4 right-4 left-4 group-hover/card:opacity-100 transition-all duration-300 ease-in-out">
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
