import { defaultSvgoPlugins } from 'src/data/svgo-plugins'
import type { Config } from 'svgo'

export type DetailsState = {
  /**
   * The original svg string upon load.
   */
  originalString: string
  /**
   * The current svg string.
   */
  currentString: string
  /**
   * SVGO Config
   */
  svgoConfig: Config
}

export type DetailsAction =
  | { type: 'reset' }
  | { type: 'init'; payload: string }
  | { type: 'update-current-string'; payload: string }

export const initDetailsState: DetailsState = {
  originalString: '',
  currentString: '',
  svgoConfig: {
    multipass: true,
    plugins: [...defaultSvgoPlugins],
    js2svg: {
      pretty: true,
      indent: 2,
    },
  },
}

export const detailsReducer = (state: DetailsState, action: DetailsAction): DetailsState => {
  switch (action.type) {
    case 'update-current-string': {
      return {
        ...state,
        currentString: action.payload,
      }
    }

    case 'init': {
      return {
        ...state,
        originalString: action.payload,
        currentString: action.payload,
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
