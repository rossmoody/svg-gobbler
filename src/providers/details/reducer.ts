import type { Config, State } from '@svgr/core'
import type { SvgoPlugin } from 'src/constants/svgo-plugins'
import type { DetailsParams } from 'src/types'
import { optimize, type Config as SvgoConfig } from 'svgo'

/**
 * This is similar in many ways to ExportState. The primary reason we don't colocate them
 * is this initializes empty because of the editable code area and doesn't facilitate optimizing
 * any more than one svg so much of the batch export is unnecessary
 */
export type DetailsState = {
  id: string // The id of the svg
  collectionId: string
  originalString: string
  currentString: string
  export: {
    filename: string
    svgoConfig: SvgoConfig & {
      multipass: boolean
      plugins: SvgoPlugin[]
      js2svg: SvgoConfig['js2svg']
    }
  }
  preview: {
    svg: {
      background: string
    }
    svgr: {
      result: string
      config: Config
      state: State
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
  | { type: 'set-svgr-result'; payload: string }
  | { type: 'set-svgr-config'; payload: Config }
  | { type: 'set-svgr-config-value'; payload: { key: string; value: boolean | string } }
  | { type: 'set-svgr-state-name'; payload: string }
  | { type: 'set-preview-background'; payload: string }

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
  preview: {
    svg: {
      background: '#FFFFFF',
    },
    svgr: {
      result: '',
      config: {
        ref: false,
        dimensions: false,
        native: false,
        typescript: false,
        memo: false,
        // Not configurable
        jsxRuntime: 'classic', // This doesn't remove if set to none
        expandProps: 'end', // Executive decision to simplify
        icon: false, // Not needed because svg is editable in panel
        prettier: false, // Problem with prettier modules but needed as false to work
        exportType: 'default', // This is silly. Does an alias of the same named export.
        namedExport: '',
        plugins: ['@svgr/plugin-jsx'],
      },
      state: {
        componentName: 'Icon',
      },
    },
  },
}

export const detailsReducer = (state: DetailsState, action: DetailsAction): DetailsState => {
  switch (action.type) {
    case 'set-preview-background': {
      return {
        ...state,
        preview: {
          ...state.preview,
          svg: {
            ...state.preview.svg,
            background: action.payload,
          },
        },
      }
    }

    case 'set-svgr-state-name': {
      return {
        ...state,
        preview: {
          ...state.preview,
          svgr: {
            ...state.preview.svgr,
            state: {
              ...state.preview.svgr.state,
              componentName: action.payload,
            },
          },
        },
      }
    }

    case 'set-svgr-config': {
      return {
        ...state,
        preview: {
          ...state.preview,
          svgr: {
            ...state.preview.svgr,
            config: action.payload,
          },
        },
      }
    }

    case 'set-svgr-config-value': {
      return {
        ...state,
        preview: {
          ...state.preview,
          svgr: {
            ...state.preview.svgr,
            config: {
              ...state.preview.svgr.config,
              [action.payload.key]: action.payload.value,
            },
          },
        },
      }
    }

    case 'set-svgr-result': {
      return {
        ...state,
        preview: {
          ...state.preview,
          svgr: {
            ...state.preview.svgr,
            result: action.payload,
          },
        },
      }
    }

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
