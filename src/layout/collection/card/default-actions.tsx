import clsx from 'clsx'
import { CardProps } from '.'

/**
 * The functionality of a given card when it is not cors restricted.
 */
export const DefaultActions = ({ data }: Pick<CardProps, 'data'>) => {
  if (!data.isCorsRestricted)
    return (
      <div className="z-10">
        {/* Select checkbox */}
        <div className="opacity-0 absolute top-1 right-1 group-hover/card:opacity-100 transition-all duration-300 ease-in-out group/select z-10">
          <label className="p-2 rounded-lg flex items-center justify-center group-hover/select:bg-gray-100/70 group-hover/select:dark:bg-gray-800 cursor-pointer">
            <input
              type="checkbox"
              className={clsx(
                'w-5 h-5 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600',
                'dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer',
              )}
            />
          </label>
        </div>

        {/* Click target and styling to drill into SVG details */}
        <span className="absolute inset-0 cursor-pointer opacity-0 group-hover/card:border-2 group-hover/card:opacity-100 border-red-500/40 rounded-xl transition-opacity ease-in" />
      </div>
    )
}
