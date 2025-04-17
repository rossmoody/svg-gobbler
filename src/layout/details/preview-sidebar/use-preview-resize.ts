import { useCallback, useEffect, useRef, useState } from 'react'

export const usePreviewResize = () => {
  const [width, setWidth] = useState(400)
  const reference = useRef<HTMLElement>(null)
  const resizeSide = useRef<null | string>(null)

  const onMouseMove = useCallback((event: MouseEvent) => {
    if (reference.current && resizeSide.current === 'left') {
      const newWidth = reference.current.getBoundingClientRect().right - event.clientX
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
          event.clientX >= boundingRect.left - threshold &&
          event.clientX <= boundingRect.left + threshold
        ) {
          resizeSide.current = 'left'
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
