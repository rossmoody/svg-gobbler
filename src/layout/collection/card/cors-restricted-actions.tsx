import { ArrowTopRightOnSquareIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { Fragment, PropsWithChildren } from 'react'
import { Button, Tooltip } from 'src/components'
import { type Image } from 'svg-gobbler-scripts'

import { type CardData } from '.'

/**
 * The functionality of a given card when it is cors restricted.
 */
export const CorsRestrictedActions = ({ children, data }: PropsWithChildren<CardData>) => {
  const handleOpenInNewTab = () => {
    window.open((data as Image).absoluteImageUrl, '_blank')
  }

  return (
    <Fragment>
      {/* Info icon in place of checkbox */}
      <div className="absolute right-3 top-3 cursor-help opacity-0 transition-all duration-300 ease-in-out group-hover/card:opacity-100">
        <Tooltip content="This SVG is restricted from cross-origin resource sharing and can't be edited or exported directly from SVG Gobbler">
          <InformationCircleIcon aria-hidden="true" className="h-6 w-6" />
        </Tooltip>
      </div>

      {/* Open in new tab button */}
      <div className="absolute bottom-4 left-4 right-4 opacity-0 transition-all duration-300 ease-in-out group-hover/card:opacity-100">
        <Button
          className="w-full justify-center bg-white dark:bg-gray-800/40"
          onClick={handleOpenInNewTab}
          size="sm"
          variant="secondary"
        >
          Open
          <ArrowTopRightOnSquareIcon aria-hidden="true" className="h-4 w-4" />
        </Button>
      </div>
      {children}
    </Fragment>
  )
}
