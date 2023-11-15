import type { SvgoPlugin } from 'src/data/svgo-plugins'
import { defaultSvgoPlugins } from 'src/data/svgo-plugins'

export const fileTypes = ['svg', 'png'] as const
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

export const initExportState: ExportState = {
  fileType: 'svg',
  filename: 'svg-gobbler',
  settings: {
    svg: {
      optimizeExports: true,
      svgoPlugins: defaultSvgoPlugins,
      prettify: true,
    },
    png: {
      size: 512,
    },
  },
}

export const exportReducer = (state: ExportState, action: ExportAction): ExportState => {
  switch (action.type) {
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

    case 'set-filename': {
      return {
        ...state,
        filename: action.payload,
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
