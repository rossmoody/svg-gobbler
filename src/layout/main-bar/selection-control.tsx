import { useEffect, useRef } from 'react'
import { useCollection } from 'src/providers'

export const SelectionControl = () => {
  const { state, dispatch } = useCollection()
  const ref = useRef<HTMLInputElement>(null)

  const selectedItems = state.selected
  const filteredItems = state.processedData.filter((item) => !item.corsRestricted)
  const allItemsSelected = selectedItems.length === filteredItems.length

  const handleCheckboxChange = () => {
    switch (allItemsSelected) {
      case true:
        dispatch({ type: 'unselect-all' })
        break

      default:
        dispatch({ type: 'select-all' })
        break
    }
  }

  useEffect(() => {
    if (ref.current === null) return
    if (allItemsSelected) {
      ref.current.indeterminate = false
    } else if (selectedItems.length === 0) {
      ref.current.indeterminate = false
    } else {
      ref.current.indeterminate = true
    }
  }, [selectedItems.length, filteredItems.length, allItemsSelected])

  return (
    <div className="flex items-center gap-2">
      <input
        ref={ref}
        type="checkbox"
        id="select"
        className="checkbox"
        onChange={handleCheckboxChange}
        checked={allItemsSelected}
      />
      <label htmlFor="select" className="font-medium text-xs cursor-pointer">
        Select {allItemsSelected ? 'none' : 'all'}
      </label>
    </div>
  )
}
