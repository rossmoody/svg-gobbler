import { Svg } from 'scripts/svg-factory/svg'
import { CollectionData } from 'src/types'

export type CollectionAction =
  | { type: 'reset' }
  | { type: 'set-data'; payload: Svg[] }
  | { type: 'set-collection-id'; payload: string }
  | { type: 'set-view'; payload: CollectionData['view'] }

export const initCollectionState: CollectionData = {
  data: [],
  collectionId: '',
  view: {
    size: 32,
  },
}

export const sidebarReducer = (state: CollectionData, action: CollectionAction): CollectionData => {
  switch (action.type) {
    case 'set-view': {
      return {
        ...state,
        view: action.payload,
      }
    }

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
