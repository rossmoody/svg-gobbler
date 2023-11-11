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
}

export type ExportAction =
  | { type: 'reset' }
  | { type: 'set-file-type'; payload: FileType }
  | { type: 'set-optimize-exports'; payload: boolean }

export const initExportState: ExportState = {
  fileType: 'svg',
  optimizeExports: false,
}

export const exportReducer = (state: ExportState, action: ExportAction): ExportState => {
  switch (action.type) {
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
