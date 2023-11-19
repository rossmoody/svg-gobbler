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

  /**
   * encodeURIComponent causes malformed URI errors with SVG strings quite often.
   * btoa is a more reliable alternative.
   */
  const handleEncodeURI = useMemo(() => {
    return `/details/${state.collectionId}/${data.id}`
  }, [state.collectionId, data.id])

  return (
    <div className="z-10">
      <div
        className={clsx(
          'absolute right-1 top-1 opacity-0 group-hover/card:opacity-100',
          'group/select z-10 transition-all duration-300 ease-in-out',
          isSelected && 'opacity-100',
        )}
      >
        <label className="flex cursor-pointer items-center justify-center rounded-lg p-2 group-hover/select:bg-gray-100/70 group-hover/select:dark:bg-gray-800">
          <input
            type="checkbox"
            onChange={handleSelect}
            checked={isSelected}
            className={clsx(
              'h-5 w-5 rounded border-gray-300 bg-gray-100 text-red-600',
              'cursor-pointer focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800',
              'transition-all duration-150 ease-in-out focus:ring-red-500 dark:focus:ring-red-600',
            )}
          />
        </label>
      </div>

      <Link
        to={handleEncodeURI}
        className="absolute inset-0 cursor-pointer rounded-xl opacity-0 shadow-md transition-all ease-in group-hover/card:opacity-100"
      />
    </div>
  )
}
