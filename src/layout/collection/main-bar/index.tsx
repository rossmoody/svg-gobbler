import { useMemo } from 'react'
import { useCollection } from 'src/providers'

import { MainActions } from './main-actions'
import { Pagination } from './pagination'
import { Search } from './search'
import { SelectedQuantity } from './selected-quantity'
import { SelectionControl } from './selection-control'

export const Mainbar = () => {
  const { state } = useCollection()

  const MainbarContextInfo = useMemo(() => {
    return state.selected.length > 0 ? SelectedQuantity : Pagination
  }, [state.selected.length])

  return (
    <aside className="main-bar">
      <SelectionControl />
      <MainActions />
      <span className="flex-grow" />
      <div className="flex items-center gap-3">
        <Search />
        <div aria-hidden className="hidden h-4 w-px bg-gray-200 dark:bg-gray-700 md:block" />
        <MainbarContextInfo />
      </div>
    </aside>
  )
}
