import type { SvgoPlugin } from 'src/data/svgo-plugins'
import type { DetailsParams } from 'src/types'
import { optimize, type Config } from 'svgo'

/**
 * This is similar in many ways to ExportState. The primary reason we don't colocate them
 * is this initializes empty because of the editable code area and doesn't facilitate optimizing
 * any more than one svg so much of the batch export is unnecessary.
 */
export type DetailsState = {
  /**
   * The id of the svg in storage
   */
  id: string
  /**
   * The id of the collection.
   */
  collectionId: string
  /**
   * The original svg string upon load.
   */
  originalString: string
  /**
   * The current svg string.
   */
  currentString: string
  /**
   * The export configuration settings
   */
  export: {
    /**
     * The filename of the export
     */
    filename: string
    /**
     * SVGO Config
     */
    svgoConfig: Config & {
      /**
       * SVGO multipass
       */
      multipass: boolean
      /**
       * SVGO plugins
       */
      plugins: SvgoPlugin[]
      /**
       * SVGO js2svg
       */
      js2svg: Config['js2svg']
    }
  }
}

export type DetailsAction =
  | { type: 'reset' }
  | { type: 'init'; payload: DetailsParams }
  | { type: 'update-current-string'; payload: string }
  | { type: 'update-original-string'; payload: string }
  | { type: 'update-export-filename'; payload: string }
  | { type: 'add-plugin'; payload: SvgoPlugin }
  | { type: 'remove-plugin'; payload: SvgoPlugin }
  | { type: 'set-svgo-plugins'; payload: SvgoPlugin[] }
  | { type: 'set-prettify'; payload: boolean }
  | { type: 'process-current-string' }
  | { type: 'set-float-precision'; payload: number }

export const initDetailsState: DetailsState = {
  id: '',
  collectionId: '',
  originalString: '',
  currentString: '',
  export: {
    filename: 'svg-gobbler',
    svgoConfig: {
      path: 'svg-gobbler',
      floatPrecision: 3,
      multipass: true,
      plugins: [],
      js2svg: {
        pretty: false,
        indent: 2,
      },
    },
  },
}

export const detailsReducer = (state: DetailsState, action: DetailsAction): DetailsState => {
  switch (action.type) {
    case 'set-float-precision': {
      return {
        ...state,
        export: {
          ...state.export,
          svgoConfig: {
            ...state.export.svgoConfig,
            floatPrecision: action.payload,
          },
        },
      }
    }

    case 'process-current-string': {
      const { data } = optimize(state.originalString, state.export.svgoConfig)

      return {
        ...state,
        currentString: data,
      }
    }

    case 'set-prettify': {
      return {
        ...state,
        export: {
          ...state.export,
          svgoConfig: {
            ...state.export.svgoConfig,
            js2svg: {
              ...state.export.svgoConfig.js2svg,
              pretty: action.payload,
            },
          },
        },
      }
    }

    case 'set-svgo-plugins': {
      return {
        ...state,
        export: {
          ...state.export,
          svgoConfig: {
            ...state.export.svgoConfig,
            plugins: action.payload,
          },
        },
      }
    }

    case 'add-plugin': {
      return {
        ...state,
        export: {
          ...state.export,
          svgoConfig: {
            ...state.export.svgoConfig,
            plugins: [...state.export.svgoConfig.plugins, action.payload],
          },
        },
      }
    }

    case 'remove-plugin': {
      return {
        ...state,
        export: {
          ...state.export,
          svgoConfig: {
            ...state.export.svgoConfig,
            plugins: state.export.svgoConfig.plugins.filter(
              (plugin: SvgoPlugin) => plugin.name !== action.payload.name,
            ),
          },
        },
      }
    }

    case 'update-export-filename': {
      return {
        ...state,
        export: {
          ...state.export,
          filename: action.payload,
          svgoConfig: {
            ...state.export.svgoConfig,
            path: action.payload,
          },
        },
      }
    }

    case 'update-original-string': {
      return {
        ...state,
        originalString: action.payload,
      }
    }

    case 'update-current-string': {
      return {
        ...state,
        currentString: action.payload,
      }
    }

    case 'init': {
      return {
        ...state,
        id: action.payload.id,
        collectionId: action.payload.collectionId,
        originalString: action.payload.originalString,
        currentString: action.payload.originalString,
      }
    }

    case 'reset': {
      return initDetailsState
    }

    default: {
      return initDetailsState
    }
  }
}
