import { useCallback } from 'react'
import { useDetails } from 'src/providers'
import { optimize as svgoOptimize } from 'svgo'

/**
 * Handle common optimization callbacks related to SVGO
 */
export const useOptimize = () => {
  const { state } = useDetails()

  /**
   * Optimize a given svg string with the current svgo config
   */
  const optimize = useCallback(
    (svg: string) => {
      const { data } = svgoOptimize(svg, state.export.svgoConfig)
      return data
    },
    [state.export.svgoConfig],
  )

  /**
   * Format a given svg string with no plugins.
   */
  const format = useCallback((svg: string) => {
    const { data } = svgoOptimize(svg, {
      js2svg: {
        indent: 2,
        pretty: true,
      },
      plugins: [],
    })
    return data
  }, [])

  /**
   * Normalize and minify a given svg string with no plugins.
   * Often used to compare two strings or get the size of a string.
   */
  const minify = useCallback((svg: string) => {
    const { data } = svgoOptimize(svg, {
      js2svg: {
        indent: 0,
        pretty: false,
      },
      plugins: [],
    })
    return data
  }, [])

  return { format, minify, optimize }
}
