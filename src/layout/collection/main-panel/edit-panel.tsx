import { Fragment, forwardRef } from 'react'
import { Button } from 'src/components'
import { EditState } from 'src/providers'

export type EditStateKey = keyof EditState

export type EditField = {
  label: string
  value: EditStateKey
}

const editFields: EditField[] = [
  { label: 'Height', value: 'height' },
  { label: 'Width', value: 'width' },
]

export const EditPanel = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
      <Fragment>
        <div ref={ref} {...props} className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-2">
            {editFields.map((field) => (
              <div className="flex flex-col" key={field.value}>
                <label className="export-label" htmlFor={field.value}>
                  {field.label}
                </label>
                <input className="export-input" id={field.value} type="text" />
              </div>
            ))}
          </div>
        </div>
        <footer className="flex shrink-0 flex-col gap-2 border-t border-gray-200 px-4 py-6 dark:border-gray-700">
          <Button className="justify-center">Apply</Button>
        </footer>
      </Fragment>
    )
  },
)
