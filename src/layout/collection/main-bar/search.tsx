import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useState } from 'react'
import { IconButton } from 'src/components'
import { useCollection } from 'src/providers'

export const Search = () => {
  const { dispatch, state } = useCollection()
  const [active, setActive] = useState(false)

  function onInputFocus() {
    setActive(true)
  }

  function onSearchInputBlur() {
    if (state.search.length > 0) return
    setActive(false)
  }

  function onSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ payload: event.target.value, type: 'set-search' })
    dispatch({ type: 'process-data' })
  }

  function clearSearch() {
    dispatch({ payload: '', type: 'set-search' })
    dispatch({ type: 'process-data' })
    setActive(false)
  }

  return (
    <div
      className={clsx(
        'relative h-8 transition-all duration-300 ease-in-out',
        active ? 'w-52' : 'w-8',
      )}
    >
      <MagnifyingGlassIcon className="pointer-events-none absolute left-2 top-1/2 z-0 h-4 w-4 -translate-y-1/2" />
      <input
        className={clsx(
          'input h-full hover:bg-gray-50 dark:hover:bg-gray-800',
          active && '!pl-7',
          !active && '!border-none',
        )}
        onBlur={onSearchInputBlur}
        onChange={onSearchInputChange}
        onFocus={onInputFocus}
        type="text"
        value={state.search}
      />
      {active && (
        <IconButton
          className="absolute right-1 top-1/2 -translate-y-1/2"
          onClick={clearSearch}
          size="xs"
          variant="ghost"
        >
          <XMarkIcon className="h-4 w-4" />
        </IconButton>
      )}
    </div>
  )
}
