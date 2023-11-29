import type { SvgoPlugin } from 'src/constants/svgo-plugins'
import { defaultSvgoPlugins } from 'src/constants/svgo-plugins'

export const fileTypes = ['svg', 'png', 'webp', 'jpeg'] as const
export type FileType = (typeof fileTypes)[number]

export type ExportState = {
  /**
   * The current file type to export. Modifies all other export settings.
   */
  fileType: FileType
  /**
   * The filename to use when exporting.
   */
  filename: string
  /**
   * The setting configurations for each file type.
   */
  settings: {
    svg: {
      /**
       * Whether or not to show the optimization settings for SVG exports.
       */
      optimizeExports: boolean
      /**
       * The current SVGO plugins to use when exporting SVGs.
       */
      svgoPlugins: SvgoPlugin[]
      /**
       * Format the SVGs with prettier.
       */
      prettify: boolean
      /**
       * The floating precision to use when optimizing SVGs.
       */
      floatPrecision: number
      /**
       * Path for SVGO config. Mainly used to prefix IDs
       */
      path: string
    }
    /**
     * PNG export settings.
     */
    png: {
      /**
       * The size of the PNG to export.
       */
      size: number
    }
    /**
     * PNG export settings.
     */
    webp: {
      /**
       * The size of the webp to export.
       */
      size: number
      /**
       * The quality of the webp to export.
       */
      quality: number
    }
    /**
     * JPEG export settings.
     */
    jpeg: {
      /**
       * The size of the jpeg to export.
       */
      size: number
      /**
       * The quality of the jpeg to export.
       */
      quality: number
    }
  }
}

export type ExportAction =
  | { type: 'reset' }
  | { type: 'set-file-type'; payload: FileType }
  | { type: 'set-optimize-exports'; payload: boolean }
  | { type: 'set-svgo-plugins'; payload: SvgoPlugin[] }
  | { type: 'add-svgo-plugin'; payload: SvgoPlugin }
  | { type: 'remove-svgo-plugin'; payload: SvgoPlugin }
  | { type: 'set-prettify'; payload: boolean }
  | { type: 'set-filename'; payload: string }
  | { type: 'set-png-size'; payload: number }
  | { type: 'set-float-precision'; payload: number }
  | { type: 'set-webp-size'; payload: number }
  | { type: 'set-webp-quality'; payload: number }
  | { type: 'set-jpeg-size'; payload: number }
  | { type: 'set-jpeg-quality'; payload: number }

export const initExportState: ExportState = {
  fileType: 'svg',
  filename: 'svg-gobbler',
  settings: {
    svg: {
      optimizeExports: true,
      svgoPlugins: defaultSvgoPlugins,
      prettify: false,
      floatPrecision: 3,
      path: 'svg-gobbler',
    },
    png: {
      size: 512,
    },
    webp: {
      size: 512,
      quality: 0.92,
    },
    jpeg: {
      size: 512,
      quality: 0.92,
    },
  },
}

export const exportReducer = (state: ExportState, action: ExportAction): ExportState => {
  switch (action.type) {
    case 'set-webp-quality': {
      return {
        ...state,
        settings: {
          ...state.settings,
          webp: {
            ...state.settings.webp,
            quality: action.payload,
          },
        },
      }
    }

    case 'set-jpeg-size': {
      return {
        ...state,
        settings: {
          ...state.settings,
          jpeg: {
            ...state.settings.jpeg,
            size: action.payload,
          },
        },
      }
    }

    case 'set-jpeg-quality': {
      return {
        ...state,
        settings: {
          ...state.settings,
          jpeg: {
            ...state.settings.jpeg,
            quality: action.payload,
          },
        },
      }
    }

    case 'set-float-precision': {
      return {
        ...state,
        settings: {
          ...state.settings,
          svg: {
            ...state.settings.svg,
            floatPrecision: action.payload,
          },
        },
      }
    }

    case 'set-svgo-plugins': {
      return {
        ...state,
        settings: {
          ...state.settings,
          svg: {
            ...state.settings.svg,
            svgoPlugins: action.payload,
          },
        },
      }
    }

    case 'set-png-size': {
      return {
        ...state,
        settings: {
          ...state.settings,
          png: {
            ...state.settings.png,
            size: action.payload,
          },
        },
      }
    }

    case 'set-webp-size': {
      return {
        ...state,
        settings: {
          ...state.settings,
          webp: {
            ...state.settings.webp,
            size: action.payload,
          },
        },
      }
    }

    case 'set-filename': {
      return {
        ...state,
        filename: action.payload,
        settings: {
          ...state.settings,
          svg: {
            ...state.settings.svg,
            path: action.payload,
          },
        },
      }
    }

    case 'set-prettify': {
      return {
        ...state,
        settings: {
          ...state.settings,
          svg: {
            ...state.settings.svg,
            prettify: action.payload,
          },
        },
      }
    }

    case 'add-svgo-plugin': {
      return {
        ...state,
        settings: {
          ...state.settings,
          svg: {
            ...state.settings.svg,
            svgoPlugins: [...state.settings.svg.svgoPlugins, action.payload],
          },
        },
      }
    }

    case 'remove-svgo-plugin': {
      return {
        ...state,
        settings: {
          ...state.settings,
          svg: {
            ...state.settings.svg,
            svgoPlugins: state.settings.svg.svgoPlugins.filter(
              (plugin) => plugin.name !== action.payload.name,
            ),
          },
        },
      }
    }

    case 'set-optimize-exports': {
      return {
        ...state,
        settings: {
          ...state.settings,
          svg: {
            ...state.settings.svg,
            optimizeExports: action.payload,
          },
        },
      }
    }

    case 'set-file-type': {
      return {
        ...state,
        fileType: action.payload,
      }
    }

    case 'reset': {
      return initExportState
    }

    default: {
      return initExportState
    }
  }
}
