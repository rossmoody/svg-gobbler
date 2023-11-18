import { useDetails } from 'src/providers'
import { optimize as svgoOptimize } from 'svgo'

export const useOptimize = () => {
  const { state } = useDetails()

  const optimize = (svg: string) => {
    const { data } = svgoOptimize(svg, state.svgoConfig)
    return data as string
  }

  return { optimize }
}
