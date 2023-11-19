import { defaultSvgoPlugins } from 'src/data/svgo-plugins'
import type { DetailsParams } from 'src/types'
import type { Config } from 'svgo'

export type DetailsState = {
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
   * SVGO Config
   */
  svgoConfig: Config
}

export type DetailsAction =
  | { type: 'reset' }
  | { type: 'init'; payload: DetailsParams }
  | { type: 'update-current-string'; payload: string }
  | { type: 'update-original-string'; payload: string }

export const initDetailsState: DetailsState = {
  collectionId: '',
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
