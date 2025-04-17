import clsx from 'clsx'
import { useMemo } from 'react'
import { useCollection } from 'src/providers'

import { CardData } from '..'

export const CardSelect = ({ data }: CardData) => {
  const { dispatch, state } = useCollection()

  const isSelected = useMemo(() => {
    return state.selected.some((svg) => svg.id === data.id)
  }, [state.selected, data])

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.checked) {
      case false: {
        return dispatch({ payload: data, type: 'remove-selected' })
      }
      case true: {
        return dispatch({ payload: data, type: 'add-selected' })
      }
    }
  }

  return (
    <div
      className={clsx(
        'absolute left-1 top-1 opacity-0 group-hover/card:opacity-100',
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
  )
}
