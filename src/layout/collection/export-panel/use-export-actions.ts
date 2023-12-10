import type { Svg } from 'svg-gobbler-scripts'

import { useExport } from 'src/providers'
import { FormUtils } from 'src/utils/form-utils'
import { logger } from 'src/utils/logger'
import { Config } from 'svgo'
// @ts-ignore
import { optimize } from 'svgo/dist/svgo.browser'

export const useExportActions = () => {
  const { state } = useExport()

  const svgoConfig: Config = {
    floatPrecision: state.settings.svg.floatPrecision,
    js2svg: {
      indent: 2,
      pretty: state.settings.svg.prettify,
    },
    multipass: true,
    path: state.settings.svg.path,
    plugins: state.settings.svg.svgoPlugins,
  }

  const processWithExportConfig = async (svgs: Svg[]) => {
    const { jpeg, png, webp } = state.settings

    switch (state.fileType) {
      case 'svg': {
        return svgs.map((svg) => {
          const { data } = optimize(svg.originalString, svgoConfig)
          return data as string
        })
      }

      case 'png': {
        return await Promise.all(
          svgs.map((svg) => FormUtils.convertToDataUrl(svg.presentationSvg, png.size, 'image/png')),
        ).catch(() => {
          logger.error('Failed to convert SVG to PNG')
          return ['']
        })
      }

      case 'webp': {
        return await Promise.all(
          svgs.map((svg) =>
            FormUtils.convertToDataUrl(svg.presentationSvg, webp.size, 'image/webp', webp.quality),
          ),
        ).catch(() => {
          logger.error('Failed to convert SVG to WebP')
          return ['']
        })
      }

      case 'jpeg': {
        return await Promise.all(
          svgs.map((svg) =>
            FormUtils.convertToDataUrl(svg.presentationSvg, jpeg.size, 'image/jpeg', jpeg.quality),
          ),
        ).catch(() => {
          logger.error('Failed to convert SVG to JPEG')
          return ['']
        })
      }

      default: {
        return ['']
      }
    }
  }

  return { processWithExportConfig }
}
