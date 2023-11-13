import clsx from 'clsx'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCollection } from 'src/providers'
import { CardProps } from '.'

/**
 * The functionality of a given card when it is not cors restricted.
 */
export const DefaultActions = ({ data }: Pick<CardProps, 'data'>) => {
  const { state, dispatch } = useCollection()

  const isSelected = useMemo(() => {
    return state.selected.includes(data)
  }, [state.selected, data])

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.checked) {
      case true:
        return dispatch({ type: 'add-selected', payload: data })
      case false:
        return dispatch({ type: 'remove-selected', payload: data })
    }
  }

  return (
    <div className="z-10">
      {/* Select checkbox */}
      <div
        className={clsx(
          'opacity-0 absolute top-1 right-1 group-hover/card:opacity-100',
          'transition-all duration-300 ease-in-out group/select z-10',
          isSelected && 'opacity-100',
        )}
      >
        <label className="p-2 rounded-lg flex items-center justify-center group-hover/select:bg-gray-100/70 group-hover/select:dark:bg-gray-800 cursor-pointer">
          <input
            type="checkbox"
            onChange={handleSelect}
            checked={isSelected}
            className={clsx(
              'w-5 h-5 text-red-600 bg-gray-100 border-gray-300 rounded',
              'dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer',
              'transition-all duration-150 ease-in-out focus:ring-red-500 dark:focus:ring-red-600',
            )}
          />
        </label>
      </div>

      {/* Click target and styling to drill into SVG details */}
      <Link
        to={`/details/${encodeURIComponent(data.originalString)}`}
        className="absolute inset-0 cursor-pointer opacity-0 group-hover/card:opacity-100 shadow-md rounded-xl transition-all ease-in"
      />
    </div>
  )
}
