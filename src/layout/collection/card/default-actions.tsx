import clsx from 'clsx'
import { Fragment, PropsWithChildren, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCollection } from 'src/providers'

import { type CardData } from '.'

/**
 * The functionality of a given card when it is not cors restricted.
 */
export const DefaultActions = ({ children, data }: PropsWithChildren<CardData>) => {
  const { dispatch, state } = useCollection()

  const isSelected = useMemo(() => {
    return state.selected.includes(data)
  }, [state.selected, data])

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.checked) {
      case true:
        return dispatch({ payload: data, type: 'add-selected' })
      case false:
        return dispatch({ payload: data, type: 'remove-selected' })
    }
  }

  return (
    <Fragment>
      <div
        className={clsx(
          'absolute right-1 top-1 opacity-0 group-hover/card:opacity-100',
          'group/select z-10 transition-all duration-300 ease-in-out',
          isSelected && 'opacity-100',
        )}
      >
        <label className="flex cursor-pointer items-center justify-center rounded-lg p-2 group-hover/select:bg-gray-100/70 group-hover/select:dark:bg-gray-800">
          <input
            checked={isSelected}
            className="h-5 w-5 cursor-pointer rounded border-gray-300 bg-gray-100 text-red-600 
            transition-all duration-150 ease-in-out focus:ring-2 focus:ring-red-500 dark:border-gray-600 
            dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-red-600"
            onChange={handleSelect}
            type="checkbox"
          />
        </label>
      </div>
      <Link
        className="flex h-full w-full items-center justify-center"
        to={`/details/${state.collectionId}/${data.id}`}
      >
        {children}
      </Link>
    </Fragment>
  )
}
