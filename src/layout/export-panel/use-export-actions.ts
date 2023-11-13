import { useExport } from 'src/providers'
import { FormUtils } from 'src/utils/form-utils'
import { Config } from 'svgo'
// @ts-ignore
import { optimize } from 'svgo/dist/svgo.browser'
import { Svg } from '../../../scripts/svg-classes/svg'

export const useExportActions = () => {
  const { state } = useExport()

  const svgoConfig: Config = {
    multipass: true,
    plugins: state.settings.svg.svgoPlugins,
    js2svg: {
      pretty: state.settings.svg.prettify,
      indent: 2,
    },
  }

  const processWithExportConfig = async (svgs: Svg[]) => {
    switch (state.fileType) {
      case 'svg': {
        return svgs.map((svg) => {
          const { data } = optimize(svg.originalString, svgoConfig)
          return data as string
        })
      }

      case 'png': {
        return await Promise.all(
          svgs.map((svg) =>
            FormUtils.svgToPngDataURL(
              svg.originalString,
              state.settings.png.size,
              state.settings.png.size,
            ),
          ),
        ).catch(() => {
          console.log('Failed to convert SVG to PNG')
          return ['Bobb']
        })
      }

      default: {
        return ['']
      }
    }
  }

  return { processWithExportConfig }
}
