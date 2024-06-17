import { Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef } from 'react'
import { useCollection } from 'src/providers'
import { loc } from 'src/utils/i18n'

export const SelectionControl = () => {
  const { dispatch: collectionDispatch, state: collectionState } = useCollection()
  const checkboxRef = useRef<HTMLInputElement>(null)

  const selectedItems = collectionState.selected.length
  const availableItems = collectionState.data.filter((item) => !item.corsRestricted).length
  const allItemsAreSelected = selectedItems === availableItems

  const handleCheckboxChange = () => {
    if (allItemsAreSelected) {
      collectionDispatch({ type: 'unselect-all' })
    } else {
      collectionDispatch({ type: 'select-all' })
    }
  }

  useEffect(() => {
    if (checkboxRef.current === null) return
    checkboxRef.current.indeterminate = selectedItems > 0 && !allItemsAreSelected
  }, [selectedItems, availableItems, allItemsAreSelected])

  return (
    <Transition
      as={Fragment}
      enter="transition ease-in-out duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in-out duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={availableItems > 0}
    >
      <div className="flex items-center gap-2">
        <input
          checked={allItemsAreSelected}
          className="checkbox"
          id="select"
          onChange={handleCheckboxChange}
          ref={checkboxRef}
          type="checkbox"
        />
        <label className="cursor-pointer text-xs font-medium leading-none" htmlFor="select">
          {loc('main_select')} {allItemsAreSelected ? loc('main_none') : loc('main_all')}
        </label>
      </div>
    </Transition>
  )
}
