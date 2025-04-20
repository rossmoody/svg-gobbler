import { forwardRef } from 'react'

export const Spinner = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (properties, reference) => {
    return (
      <div className="spinner" ref={reference} {...properties}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1m0 19a8 8 0 1 1 8-8 8 8 0 0 1-8 8"
            fill="currentColor"
            opacity=".25"
          />
          <path
            d="M10.72 19.9a8 8 0 0 1-6.5-9.79 7.77 7.77 0 0 1 6.18-5.95 8 8 0 0 1 9.49 6.52A1.54 1.54 0 0 0 21.38 12h.13a1.37 1.37 0 0 0 1.38-1.54 11 11 0 1 0-12.7 12.39A1.54 1.54 0 0 0 12 21.34a1.47 1.47 0 0 0-1.28-1.44"
            fill="currentColor"
            style={{ animation: 'spinner .75s infinite linear', transformOrigin: 'center' }}
          />
        </svg>
      </div>
    )
  },
)
