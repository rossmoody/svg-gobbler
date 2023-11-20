import { useCallback, useEffect, useRef, useState } from 'react'

export const useExportResize = () => {
  const [width, setWidth] = useState(320)
  const ref = useRef<HTMLElement>(null)
  const resizeSide = useRef<'right' | null>(null)

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (ref.current && resizeSide.current === 'right') {
      const newWidth = e.clientX - ref.current.getBoundingClientRect().left
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
      if (ref.current) {
        const boundingRect = ref.current.getBoundingClientRect()
        const threshold = 20 // pixels from the edge to detect resize

        if (
          e.clientX >= boundingRect.right - threshold &&
          e.clientX <= boundingRect.right + threshold
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
    const element = ref.current

    if (element) {
      element.addEventListener('mousedown', onMouseDown)
    }

    return () => {
      if (element) {
        element.removeEventListener('mousedown', onMouseDown)
      }
    }
  }, [onMouseDown])

  return { ref, width }
}
