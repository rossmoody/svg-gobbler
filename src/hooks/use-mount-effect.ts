import { useEffect } from 'react'

/**
 * A hook that runs a function only once when the component mounts.
 * @param fn The function to run only once when the component mounts
 */
export const useMountEffect = (fn: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fn, [])
}
