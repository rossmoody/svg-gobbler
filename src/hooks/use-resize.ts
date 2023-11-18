import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Facilitates resizing of an element based on whether it is
 * the right or left side of the element that is being dragged.
 */
export const useResize = (initialWidth = 320) => {
  const [width, setWidth] = useState(initialWidth)
  const ref = useRef<HTMLElement>(null)
  const resizeSide = useRef<'left' | 'right' | null>(null)

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (ref.current && resizeSide.current) {
      let newWidth

      if (resizeSide.current === 'right') {
        newWidth = e.clientX
      } else {
        newWidth = window.innerWidth - e.clientX
      }

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

        if (e.clientX < boundingRect.left + 20 && e.clientX > boundingRect.left - 20) {
          resizeSide.current = 'left'
        } else if (e.clientX < boundingRect.right + 20 && e.clientX > boundingRect.right - 20) {
          resizeSide.current = 'right'
        }

        if (resizeSide.current) {
          document.addEventListener('mousemove', onMouseMove)
          document.addEventListener('mouseup', onMouseUp)
        }
      }
    },
    [onMouseMove, onMouseUp],
  )

  useEffect(() => {
    const { current } = ref

    if (current) {
      current.addEventListener('mousedown', onMouseDown)
    }

    return () => {
      if (current) {
        current.removeEventListener('mousedown', onMouseDown)
      }
    }
  }, [onMouseDown])

  return { ref, width }
}
