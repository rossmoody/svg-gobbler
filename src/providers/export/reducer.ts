import type { SvgoPlugin } from 'src/data/svgo'
import { defaultSvgoPlugins } from 'src/data/svgo'

export const fileTypes = ['svg', 'png', 'jpg'] as const
export type FileType = (typeof fileTypes)[number]

export type ExportState = {
  /**
   * The current file type to export. Modifies all other export settings.
   */
  fileType: FileType
  /**
   * Whether or not to show the optimization settings for SVG exports.
   */
  optimizeExports: boolean
  /**
   * The current SVGO plugins to use when exporting SVGs.
   */
  svgoPlugins: SvgoPlugin[]
}

export type ExportAction =
  | { type: 'reset' }
  | { type: 'set-file-type'; payload: FileType }
  | { type: 'set-optimize-exports'; payload: boolean }
  | { type: 'add-svgo-plugin'; payload: SvgoPlugin }
  | { type: 'remove-svgo-plugin'; payload: SvgoPlugin }

export const initExportState: ExportState = {
  fileType: 'svg',
  optimizeExports: false,
  svgoPlugins: defaultSvgoPlugins,
}

export const exportReducer = (state: ExportState, action: ExportAction): ExportState => {
  switch (action.type) {
    case 'add-svgo-plugin': {
      return {
        ...state,
        svgoPlugins: [...state.svgoPlugins, action.payload],
      }
    }

    case 'remove-svgo-plugin': {
      return {
        ...state,
        svgoPlugins: state.svgoPlugins.filter((plugin) => plugin !== action.payload),
      }
    }

    case 'set-optimize-exports': {
      return {
        ...state,
        optimizeExports: action.payload,
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
