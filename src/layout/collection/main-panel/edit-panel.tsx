import { forwardRef } from 'react'

export const EditPanel = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
      <div ref={ref} {...props}>
        Bulk edits panel
      </div>
    )
  },
)
