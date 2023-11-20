import type { SvgoPlugin } from 'src/data/svgo-plugins'
import type { DetailsParams } from 'src/types'
import { type Config } from 'svgo'

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
     * Whether or not to minify the output. The editor config
     * is always to prettify. This is just for the export.
     */
    minify: boolean
    /**
     * SVGO Config
     */
    svgoConfig: {
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
  | { type: 'set-minify'; payload: boolean }

export const initDetailsState: DetailsState = {
  id: '',
  collectionId: '',
  originalString: '',
  currentString: '',
  export: {
    filename: 'svg-gobbler',
    minify: true,
    svgoConfig: {
      multipass: true,
      plugins: [],
      js2svg: {
        pretty: true,
        indent: 2,
      },
    },
  },
}

export const detailsReducer = (state: DetailsState, action: DetailsAction): DetailsState => {
  switch (action.type) {
    case 'set-minify': {
      return {
        ...state,
        export: {
          ...state.export,
          minify: action.payload,
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
              (plugin) => plugin.name !== action.payload.name,
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
        export: {
          ...state.export,
          svgoConfig: {
            ...state.export.svgoConfig,
            plugins: action.payload.defaultSvgoPlugins,
          },
        },
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
