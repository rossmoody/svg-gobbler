import { MainActions } from './main-actions'
import { Pagination } from './pagination'
import { SelectionControl } from './selection-control'

export const Mainbar = () => {
  return (
    <aside className="main-bar">
      <SelectionControl />
      <MainActions />
      <span className="flex-grow" />
      <Pagination />
    </aside>
  )
}
