import { MainActions } from './main-actions'
import { SelectionControl } from './selection-control'

export const Mainbar = () => {
  return (
    <aside className="main-bar">
      <SelectionControl />
      <MainActions />
    </aside>
  )
}
