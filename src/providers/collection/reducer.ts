import { Svg } from 'scripts/svg-classes/svg'
import { CollectionData } from 'src/types'

export type CollectionState = CollectionData & {
  /**
   * Processed data is the collection data that is ready to be rendered
   * after going through the filters and sorters and paginators.
   */
  processedData: Svg[]
  /**
   * The selected SVGs in the collection.
   */
  selected: Svg[]
}

export type CollectionAction =
  | { type: 'reset' }
  | { type: 'process-data' }
  | { type: 'set-data'; payload: Svg[] }
  | { type: 'set-collection-id'; payload: string }
  | { type: 'set-view'; payload: CollectionState['view'] }
  | { type: 'add-selected'; payload: Svg }
  | { type: 'remove-selected'; payload: Svg }
  | { type: 'select-all' }
  | { type: 'unselect-all' }

export const initCollectionState: CollectionState = {
  data: [],
  processedData: [],
  selected: [],
  collectionId: '',
  view: {
    size: 48,
    sort: 'none',
    filters: {
      'hide-cors': false,
    },
  },
}

export const collectionReducer = (state: CollectionState, action: CollectionAction) => {
  switch (action.type) {
    case 'select-all': {
      return {
        ...state,
        selected: state.processedData.filter((item) => !item.corsRestricted),
      }
    }

    case 'unselect-all': {
      return {
        ...state,
        selected: [],
      }
    }

    case 'add-selected': {
      return {
        ...state,
        selected: [...state.selected, action.payload],
      }
    }

    case 'remove-selected': {
      return {
        ...state,
        selected: state.selected.filter((svg) => svg !== action.payload),
      }
    }

    case 'process-data': {
      let processedData = [...state.data]

      // Process filters
      Object.entries(state.view.filters).forEach(([filter, value]) => {
        switch (filter) {
          case 'hide-cors': {
            if (!value) break
            processedData = processedData.filter(
              (svg) => !(svg.asElement instanceof HTMLImageElement),
            )
            break
          }
        }
      })

      // Process sorting
      switch (state.view.sort) {
        case 'file-asc': {
          processedData = processedData.sort((a, b) => {
            const aSize = new Blob([a.originalString]).size
            const bSize = new Blob([b.originalString]).size
            return aSize - bSize
          })
          break
        }

        case 'file-desc': {
          processedData = processedData.sort((a, b) => {
            const aSize = new Blob([a.originalString]).size
            const bSize = new Blob([b.originalString]).size
            return bSize - aSize
          })
          break
        }
      }

      return {
        ...state,
        processedData,
      }
    }

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
