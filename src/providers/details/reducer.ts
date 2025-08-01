import type { Config, State } from '@svgr/core'
import type { SvgoPlugin } from 'src/constants/svgo-plugins'
import type { DetailsParameters } from 'src/types'
import type { Config as SvgoConfig } from 'svgo'

import { optimize } from 'svgo'

export type DetailsAction =
  | { payload: boolean; type: 'set-prettify' }
  | { payload: Config; type: 'set-svgr-config' }
  | { payload: DetailsParameters; type: 'init' }
  | { payload: number; type: 'set-float-precision' }
  | { payload: PreviewBackgroundClass; type: 'set-preview-background' }
  | { payload: string; type: 'set-preview-scale' }
  | { payload: string; type: 'set-svgr-result' }
  | { payload: string; type: 'set-svgr-state-name' }
  | { payload: string; type: 'update-current-string' }
  | { payload: string; type: 'update-name' }
  | { payload: string; type: 'update-original-name' }
  | { payload: string; type: 'update-original-string' }
  | { payload: SvgoPlugin; type: 'add-plugin' }
  | { payload: SvgoPlugin; type: 'remove-plugin' }
  | { payload: SvgoPlugin[]; type: 'set-svgo-plugins' }
  | { payload: { key: string; value: boolean | string }; type: 'set-svgr-config-value' }
  | { type: 'process-current-string' }
  | { type: 'reset' }

/**
 * This is similar in many ways to ExportState. The primary reason we don't colocate them
 * is this initializes empty because of the editable code area and doesn't facilitate optimizing
 * any more than one svg so much of the batch export is unnecessary
 */
export type DetailsState = {
  collectionId: string
  currentString: string
  export: {
    svgoConfig: SvgoConfig & {
      js2svg: SvgoConfig['js2svg']
      multipass: boolean
      plugins: SvgoPlugin[]
    }
  }
  id: string // The id of the svg
  name: string
  originalName: string
  originalString: string
  preview: {
    svg: {
      background: PreviewBackgroundClass
      scale: number
    }
    svgr: {
      config: Config
      result: string
      state: State
    }
  }
}

export type PreviewBackgroundClass = 'black' | 'gray' | 'transparent' | 'white'

export const initDetailsState: DetailsState = {
  collectionId: '',
  currentString: '',
  export: {
    svgoConfig: {
      floatPrecision: 3,
      js2svg: {
        indent: 2,
        pretty: false,
      },
      multipass: true,
      path: 'svg-gobbler',
      plugins: [],
    },
  },
  id: '',
  name: '',
  originalName: '',
  originalString: '',
  preview: {
    svg: {
      background: 'transparent',
      scale: 1,
    },
    svgr: {
      config: {
        dimensions: false,
        expandProps: 'end', // Executive decision to simplify
        exportType: 'default', // This is silly. Does an alias of the same named export.
        icon: false, // Not needed because svg is editable in panel
        // Not configurable
        jsxRuntime: 'classic', // This doesn't remove if set to none
        memo: false,
        namedExport: '',
        native: false,
        plugins: ['@svgr/plugin-jsx'],
        prettier: false, // Problem with prettier modules but needed as false to work
        ref: false,
        typescript: false,
      },
      result: '',
      state: {
        componentName: 'Icon',
      },
    },
  },
}

export const detailsReducer = (state: DetailsState, action: DetailsAction): DetailsState => {
  switch (action.type) {
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

    case 'init': {
      return {
        ...state,
        collectionId: action.payload.collectionId,
        currentString: action.payload.svg.svg,
        export: {
          ...state.export,
          svgoConfig: {
            ...state.export.svgoConfig,
            path: action.payload.svg.name,
          },
        },
        id: action.payload.svg.id,
        name: action.payload.svg.name,
        originalName: action.payload.svg.name,
        originalString: action.payload.svg.svg,
      }
    }

    case 'process-current-string': {
      const { data } = optimize(state.currentString, state.export.svgoConfig)

      return {
        ...state,
        currentString: data,
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

    case 'reset': {
      return initDetailsState
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

    case 'set-preview-scale': {
      return {
        ...state,
        preview: {
          ...state.preview,
          svg: {
            ...state.preview.svg,
            scale: Number.parseFloat(action.payload),
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

    case 'update-current-string': {
      return {
        ...state,
        currentString: action.payload,
      }
    }

    case 'update-name': {
      return {
        ...state,
        export: {
          ...state.export,
          svgoConfig: {
            ...state.export.svgoConfig,
            path: action.payload,
          },
        },
        name: action.payload,
      }
    }

    case 'update-original-name': {
      return {
        ...state,
        originalName: action.payload,
      }
    }

    case 'update-original-string': {
      return {
        ...state,
        originalString: action.payload,
      }
    }

    default: {
      return initDetailsState
    }
  }
}
