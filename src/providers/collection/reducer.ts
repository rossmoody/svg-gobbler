import { Svg } from 'scripts/svg-factory/svg'

export type CollectionState = {
  /**
   * Whether the mainbar is open or not
   */
  data: Svg[]
  /**
   * The collection id
   */
  collectionId: string
}

export type CollectionAction =
  | { type: 'reset' }
  | { type: 'set-data'; payload: Svg[] }
  | { type: 'set-collection-id'; payload: string }

export const initCollectionState: CollectionState = {
  data: [],
  collectionId: '',
}

export const sidebarReducer = (
  state: CollectionState,
  action: CollectionAction,
): CollectionState => {
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
      return initCollectionState
    }

    default: {
      return initCollectionState
    }
  }
}
