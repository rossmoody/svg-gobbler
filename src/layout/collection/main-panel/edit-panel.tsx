import { Transition } from '@headlessui/react'
import { forwardRef, Fragment, useMemo, useState } from 'react'
import { Button, HelpIcon } from 'src/components'
import { editFields } from 'src/constants/edit-fields'
import { useEditData } from 'src/hooks/use-edit-data'
import { EditStateKey, useEdit } from 'src/providers'
import { loc } from 'src/utilities/i18n'

import { transitionConfig } from './export-panel'

export type EditField = {
  label: string
  tooltip?: string
  value: EditStateKey
}

const BUTTON_LABELS = {
  applied: loc('edit_applied'),
  apply: loc('edit_apply'),
}

export const EditPanel = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (properties, reference) => {
    const [buttonLabel, setButtonLabel] = useState(BUTTON_LABELS.apply)
    const { dispatch, state } = useEdit()
    const { handleUpdateProperties } = useEditData()

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
      const { id, value } = event.currentTarget as { id: EditStateKey; value: string }
      dispatch({
        payload: { [id]: value },
        type: 'set-edit-property-value',
      })
    }

    function handleCustomInputChange(event: React.ChangeEvent<HTMLInputElement>) {
      const { id, value } = event.currentTarget as {
        id: 'custom-name' | 'custom-value'
        value: string
      }

      switch (id) {
        case 'custom-name': {
          dispatch({
            payload: value,
            type: 'set-edit-custom-name',
          })
          break
        }

        case 'custom-value': {
          dispatch({
            payload: value,
            type: 'set-edit-custom-value',
          })
          break
        }
      }
    }

    function handleReset() {
      dispatch({ type: 'reset' })
    }

    function handleApplyChanges() {
      handleUpdateProperties()
      setButtonLabel(BUTTON_LABELS.applied)
      setTimeout(() => {
        setButtonLabel(BUTTON_LABELS.apply)
      }, 2000)
    }

    const isDirtyState = useMemo(() => {
      const isStandardDirty = Object.values(state.standard).some((value) => value !== '')
      const isCustomNameDirty = state.custom.name !== ''
      const isCustomValueDirty = state.custom.value !== ''
      return isStandardDirty || (isCustomNameDirty && isCustomValueDirty)
    }, [state])

    return (
      <Fragment>
        <div ref={reference} {...properties} className="flex-1 overflow-y-auto p-4">
          <h2 className="my-3 text-sm font-medium">Properties</h2>
          <div className="flex flex-col gap-2">
            <div className="group">
              <div className="flex items-center gap-0.5">
                <label className="export-label" htmlFor="custom-name">
                  Custom name
                </label>
                <HelpIcon content="The name of the property to apply to the SVG element" />
              </div>
              <input
                className="export-input"
                id="custom-name"
                onChange={handleCustomInputChange}
                type="text"
                value={state.custom.name}
              />
            </div>
            <div className="group">
              <div className="flex items-center gap-0.5">
                <label className="export-label" htmlFor="custom-value">
                  Custom value
                </label>
                <HelpIcon content="The value of the custom property to apply to the SVG element" />
              </div>
              <input
                className="export-input"
                id="custom-value"
                onChange={handleCustomInputChange}
                type="text"
                value={state.custom.value}
              />
            </div>
          </div>

          <hr className="my-6" />

          <div className="flex flex-col gap-2">
            {editFields.map((field) => (
              <div className="group" key={field.value}>
                <div className="flex items-center gap-0.5">
                  <label className="export-label" htmlFor={field.value}>
                    {field.label}
                  </label>
                  {field.tooltip && <HelpIcon content={field.tooltip} />}
                </div>
                <input
                  className="export-input"
                  id={field.value}
                  onChange={handleInputChange}
                  type="text"
                  value={state.standard[field.value]}
                />
              </div>
            ))}
          </div>
        </div>
        <footer className="flex shrink-0 flex-col gap-2 border-t border-gray-200 px-4 pb-6 pt-4 dark:border-gray-700">
          <Transition as="div" className="flex-1" show={isDirtyState} {...transitionConfig}>
            <Button className="w-full" onClick={handleReset} variant="secondary">
              Reset
            </Button>
          </Transition>
          <Button disabled={!isDirtyState} onClick={handleApplyChanges}>
            {buttonLabel}
          </Button>
        </footer>
      </Fragment>
    )
  },
)
