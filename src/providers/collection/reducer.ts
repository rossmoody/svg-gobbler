import type { Svg } from 'src/scripts'
import type { CollectionData } from 'src/types'

export type CollectionState = {
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
} & CollectionData

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
    colorMode: 'light',
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
          ...state.data.slice(state.pageCount * 300, (state.pageCount + 1) * 300),
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
      let processedData = [...state.data]

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
          processedData.sort((a, b) => {
            const aSize = new Blob([a.svg]).size
            const bSize = new Blob([b.svg]).size
            return aSize - bSize
          })
          break
        }

        case 'file-desc': {
          processedData.sort((a, b) => {
            const aSize = new Blob([a.svg]).size
            const bSize = new Blob([b.svg]).size
            return bSize - aSize
          })
          break
        }

        case 'last-asc': {
          processedData.sort((a, b) => {
            const aDate = new Date(a.lastEdited).getTime()
            const bDate = new Date(b.lastEdited).getTime()
            return bDate - aDate
          })
          break
        }

        case 'last-desc': {
          processedData.sort((a, b) => {
            const aDate = new Date(a.lastEdited).getTime()
            const bDate = new Date(b.lastEdited).getTime()
            return aDate - bDate
          })
          break
        }
      }

      return {
        ...state,
        pageCount: 1,
        processedData: processedData.slice(0, 300),
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
