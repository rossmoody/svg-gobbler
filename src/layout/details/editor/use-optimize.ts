import { useCallback } from 'react'
import { useDetails } from 'src/providers'
import { optimize as svgoOptimize } from 'svgo'

export const useOptimize = () => {
  const { state } = useDetails()

  /**
   * Optimize a given svg string with the current svgo config.
   */
  const optimize = useCallback(
    (svg: string) => {
      const { data } = svgoOptimize(svg, state.svgoConfig)
      return data as string
    },
    [state.svgoConfig],
  )

  /**
   * Format a given svg string with no plugins.
   */
  const format = useCallback((svg: string) => {
    const { data } = svgoOptimize(svg, {
      plugins: [],
      js2svg: {
        pretty: true,
        indent: 2,
      },
    })
    return data as string
  }, [])

  /**
   * Minify a given svg string with no plugins.
   * Often used to compare two strings or get the size of a string.
   */
  const minify = useCallback((svg: string) => {
    const { data } = svgoOptimize(svg, {
      plugins: [],
      js2svg: {
        pretty: false,
        indent: 0,
      },
    })
    return data as string
  }, [])

  return { optimize, format, minify }
}
