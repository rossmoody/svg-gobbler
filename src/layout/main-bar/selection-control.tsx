import { Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef } from 'react'
import { useCollection } from 'src/providers'

export const SelectionControl = () => {
  const { state: collectionState, dispatch: collectionDispatch } = useCollection()
  const checkboxRef = useRef<HTMLInputElement>(null)

  const selectedItems = collectionState.selected
  const availableItems = collectionState.processedData.filter((item) => !item.corsRestricted)
  const allItemsAreSelected = selectedItems.length === availableItems.length

  const handleCheckboxChange = () => {
    if (allItemsAreSelected) {
      collectionDispatch({ type: 'unselect-all' })
    } else {
      collectionDispatch({ type: 'select-all' })
    }
  }

  useEffect(() => {
    if (checkboxRef.current === null) return
    checkboxRef.current.indeterminate = selectedItems.length > 0 && !allItemsAreSelected
  }, [selectedItems.length, availableItems.length, allItemsAreSelected])

  return (
    <Transition
      as={Fragment}
      show={availableItems.length > 0}
      enter="transition ease-in-out duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in-out duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex items-center gap-2">
        <input
          ref={checkboxRef}
          type="checkbox"
          id="select"
          className="checkbox"
          onChange={handleCheckboxChange}
          checked={allItemsAreSelected}
        />
        <label htmlFor="select" className="font-medium text-xs cursor-pointer">
          Select {allItemsAreSelected ? 'none' : 'all'}
        </label>
      </div>
    </Transition>
  )
}
