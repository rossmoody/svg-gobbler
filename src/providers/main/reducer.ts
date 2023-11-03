import { Svg } from 'scripts/svg-factory/svg'

export type MainState = {
  /**
   * Whether the mainbar is open or not
   */
  data: Svg[]
  /**
   * The collection id
   */
  collectionId: string
}

export type MainAction =
  | { type: 'reset' }
  | { type: 'set-data'; payload: Svg[] }
  | { type: 'set-collection-id'; payload: string }

export const initMainState: MainState = {
  data: [],
  collectionId: '',
}

export const sidebarReducer = (state: MainState, action: MainAction): MainState => {
  switch (action.type) {
    case 'set-collection-id': {
      return {
        ...state,
        collectionId: action.payload,
      }
    }

    case 'set-data': {
      return {
        ...state,
        data: action.payload,
      }
    }

    case 'reset': {
      return initMainState
    }

    default: {
      return initMainState
    }
  }
}
