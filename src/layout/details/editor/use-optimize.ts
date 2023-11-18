import { useCallback } from 'react'
import { useDetails } from 'src/providers'
import { optimize as svgoOptimize } from 'svgo'

export const useOptimize = () => {
  const { state } = useDetails()

  const optimize = useCallback(
    (svg: string) => {
      const { data } = svgoOptimize(svg, state.svgoConfig)
      return data as string
    },
    [state.svgoConfig],
  )

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

  return { optimize, format }
}
