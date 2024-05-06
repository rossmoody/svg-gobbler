import type { CollectionData } from 'src/types'
import type { Svg } from 'svg-gobbler-scripts'

export type CollectionState = CollectionData & {
  /**
   * Pagination increment count for loading more items.
   */
  pageCount: number
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
  | { payload: CollectionState['view']; type: 'set-view' }
  | { payload: Svg; type: 'add-selected' }
  | { payload: Svg; type: 'remove-selected' }
  | { payload: Svg[]; type: 'set-data' }
  | { payload: string; type: 'set-canvas-color' }
  | { payload: string; type: 'set-collection-id' }
  | { type: 'load-more' }
  | { type: 'process-data' }
  | { type: 'reset' }
  | { type: 'select-all' }
  | { type: 'unselect-all' }

export const initCollectionState: CollectionState = {
  collectionId: '',
  data: [],
  pageCount: 1,
  processedData: [],
  selected: [],
  view: {
    canvas: '#ffffff',
    filters: {
      'hide-cors': false,
    },
    size: 96,
    sort: 'none',
  },
}

export const collectionReducer = (
  state: CollectionState,
  action: CollectionAction,
): CollectionState => {
  switch (action.type) {
    case 'set-canvas-color': {
      return {
        ...state,
        view: {
          ...state.view,
          canvas: action.payload,
        },
      }
    }

    case 'load-more': {
      return {
        ...state,
        pageCount: state.pageCount + 1,
        processedData: [
          ...state.processedData,
          ...state.data.slice(state.pageCount * 200, (state.pageCount + 1) * 200),
        ],
      }
    }

    case 'select-all': {
      return {
        ...state,
        selected: state.data.filter((item) => !item.corsRestricted),
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
      let processedData = [...state.data].slice(0, 200)

      // Process filters
      Object.entries(state.view.filters).forEach(([filter, value]) => {
        switch (filter) {
          case 'hide-cors': {
            if (!value) break
            processedData = processedData.filter((svg) => !svg.corsRestricted)
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
        pageCount: 1,
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
