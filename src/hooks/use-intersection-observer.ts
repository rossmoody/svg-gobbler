import { useEffect, useRef, useState } from 'react'

/**
 * A simple hook that uses the Intersection Observer API to detect when an element
 * enters or exits the viewport.
 */
export const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)
  const elementReference = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementReference.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return { elementRef: elementReference, isIntersecting }
}
