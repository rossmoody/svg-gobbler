import type { Svg } from 'src/scripts'

import { useExport } from 'src/providers'
import { formUtilities } from 'src/utilities/form-utilities'
import { logger } from 'src/utilities/logger'
import { Config } from 'svgo'
// @ts-expect-error
import { optimize } from 'svgo/dist/svgo.browser'

export type ExportSvg = {
  name: string
  payload: string
}

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

  const processWithExportConfig = async (svgs: Svg[]): Promise<ExportSvg[]> => {
    const { jpeg, png, webp } = state.settings

    switch (state.fileType) {
      case 'jpeg': {
        return await Promise.all(
          svgs.map(async (svg) => ({
            name: svg.name,
            payload: await formUtilities.convertToDataUrl(
              svg.presentationSvg,
              jpeg.size,
              'image/jpeg',
              jpeg.quality,
            ),
          })),
        ).catch((error: Error) => {
          logger.error('Failed to convert SVG to PNG:', error.message)
          return []
        })
      }

      case 'png': {
        return await Promise.all(
          svgs.map(async (svg) => ({
            name: svg.name,
            payload: await formUtilities.convertToDataUrl(
              svg.presentationSvg,
              png.size,
              'image/png',
            ),
          })),
        ).catch((error: Error) => {
          logger.error('Failed to convert SVG to PNG:', error.message)
          return []
        })
      }

      case 'svg': {
        return svgs.map((svg) => {
          const { data } = optimize(svg.svg, svgoConfig)
          return {
            name: svg.name,
            payload: data as string,
          }
        })
      }

      case 'webp': {
        return await Promise.all(
          svgs.map(async (svg) => ({
            name: svg.name,
            payload: await formUtilities.convertToDataUrl(
              svg.presentationSvg,
              webp.size,
              'image/webp',
              webp.quality,
            ),
          })),
        ).catch((error: Error) => {
          logger.error('Failed to convert SVG to PNG:', error.message)
          return []
        })
      }

      default: {
        return []
      }
    }
  }

  return { processWithExportConfig }
}
