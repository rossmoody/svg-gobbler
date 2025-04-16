import { useCallback, useEffect, useRef, useState } from 'react'

export const usePreviewResize = () => {
  const [width, setWidth] = useState(400)
  const reference = useRef<HTMLElement>(null)
  const resizeSide = useRef<null | string>(null)

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (reference.current && resizeSide.current === 'left') {
      const newWidth = reference.current.getBoundingClientRect().right - e.clientX
      if (newWidth > 0) setWidth(newWidth)
    }
  }, [])

  const onMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    resizeSide.current = null
  }, [onMouseMove])

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      if (reference.current) {
        const boundingRect = reference.current.getBoundingClientRect()
        const threshold = 20 // pixels from the edge to detect resize

        if (
          e.clientX >= boundingRect.left - threshold &&
          e.clientX <= boundingRect.left + threshold
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
