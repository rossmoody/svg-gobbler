import { useMemo } from 'react'
import { useCollection } from 'src/providers'

import { MainActions } from './main-actions'
import { Pagination } from './pagination'
import { SelectedQuantity } from './selected-quantity'
import { SelectionControl } from './selection-control'

export const Mainbar = () => {
  const { state } = useCollection()

  const MainbarContextInfo = useMemo(() => {
    return state.selected.length ? SelectedQuantity : Pagination
  }, [state.selected.length])

  return (
    <aside className="main-bar">
      <SelectionControl />
      <MainActions />
      <span className="flex-grow" />
      <MainbarContextInfo />
    </aside>
  )
}
