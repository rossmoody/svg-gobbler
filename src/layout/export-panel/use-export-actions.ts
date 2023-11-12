import { useExport } from 'src/providers'
import { Config } from 'svgo'
// @ts-ignore
import { optimize } from 'svgo/dist/svgo.browser'
import { Svg } from '../../../scripts/svg-classes/svg'

export const useExportActions = () => {
  const { state } = useExport()

  const svgoConfig: Config = {
    multipass: true,
    plugins: state.svgoPlugins,
    js2svg: {
      pretty: true,
      indent: 2,
    },
  }

  const processWithSvgo = (svgs: Svg[]) => {
    return svgs.map((svg) => {
      const { data } = optimize(svg.originalString, svgoConfig)
      return data as string
    })
  }

  const processWithExportConfig = (svgs: Svg[]) => {
    switch (state.fileType) {
      case 'svg': {
        if (state.optimizeExports) {
          return processWithSvgo(svgs)
        }

        return svgs.map((svg) => svg.originalString)
      }

      default: {
        return ['']
      }
    }
  }

  return { processWithExportConfig, processWithSvgo }
}
