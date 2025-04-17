import { useCallback, useEffect, useRef, useState } from 'react'

export const useExportResize = () => {
  const [width, setWidth] = useState(320)
  const reference = useRef<HTMLElement>(null)
  const resizeSide = useRef<'right' | null>(null)

  const onMouseMove = useCallback((event: MouseEvent) => {
    if (reference.current && resizeSide.current === 'right') {
      const newWidth = event.clientX - reference.current.getBoundingClientRect().left
      if (newWidth > 0) setWidth(newWidth)
    }
  }, [])

  const onMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    // eslint-disable-next-line unicorn/no-null
    resizeSide.current = null
  }, [onMouseMove])

  const onMouseDown = useCallback(
    (event: MouseEvent) => {
      if (reference.current) {
        const boundingRect = reference.current.getBoundingClientRect()
        const threshold = 20 // pixels from the edge to detect resize

        if (
          event.clientX >= boundingRect.right - threshold &&
          event.clientX <= boundingRect.right + threshold
        ) {
          resizeSide.current = 'right'
          document.addEventListener('mousemove', onMouseMove)
          document.addEventListener('mouseup', onMouseUp)
        }
      }
    },
    [onMouseMove, onMouseUp],
  )

  useEffect(() => {
    const element = reference.current

    if (element) {
      element.addEventListener('mousedown', onMouseDown)
    }

    return () => {
      if (element) {
        element.removeEventListener('mousedown', onMouseDown)
      }
    }
  }, [onMouseDown])

  return { ref: reference, width }
}
