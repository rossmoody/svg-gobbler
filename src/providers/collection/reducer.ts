import type { Svg } from 'src/scripts'
import type { CollectionData } from 'src/types'

export type CollectionAction =
  | { payload: CollectionState['view']; type: 'set-view' }
  | { payload: string; type: 'set-canvas-color' }
  | { payload: string; type: 'set-collection-id' }
  | { payload: string; type: 'set-search' }
  | { payload: Svg; type: 'add-selected' }
  | { payload: Svg; type: 'remove-selected' }
  | { payload: Svg[]; type: 'set-data' }
  | { payload: Svg[]; type: 'set-selected' }
  | { type: 'load-more' }
  | { type: 'process-data' }
  | { type: 'reset' }
  | { type: 'select-all' }
  | { type: 'unselect-all' }

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
   * The search string used to filter the collection.
   */
  search: string
  /**
   * The selected SVGs in the collection.
   */
  selected: Svg[]
}

export const initCollectionState: CollectionState = {
  collectionId: '',
  data: [],
  pageCount: 1,
  processedData: [],
  search: '',
  selected: [],
  view: {
    canvas: '#ffffff',
    colorMode: 'light',
    filters: {
      'hide-cors': false,
      'show-name': false,
      'show-size': false,
    },
    size: 96,
    sort: 'file-desc',
  },
}

const PAGE_SIZE = 100

export const collectionReducer = (
  state: CollectionState,
  action: CollectionAction,
): CollectionState => {
  switch (action.type) {
    case 'add-selected': {
      return {
        ...state,
        selected: [...state.selected, action.payload],
      }
    }

    case 'load-more': {
      return {
        ...state,
        pageCount: state.pageCount + 1,
        processedData: [
          ...state.processedData,
          ...state.data.slice(state.pageCount * PAGE_SIZE, (state.pageCount + 1) * PAGE_SIZE),
        ],
      }
    }

    case 'process-data': {
      let processedData = [...state.data]

      // Process filters
      for (const [filter, value] of Object.entries(state.view.filters)) {
        switch (filter) {
          case 'hide-cors': {
            if (!value) break
            processedData = processedData.filter((svg) => !svg.corsRestricted)
            break
          }
        }
      }

      // Process search
      if (state.search) {
        processedData = processedData.filter((svg) => {
          const name = svg.name.toLowerCase()
          const search = state.search.toLowerCase()
          const svgString = svg.svg.toLowerCase()
          return name.includes(search) || svgString.includes(search)
        })
      }

      // Process sorting
      switch (state.view.sort) {
        case 'alphabetical-asc': {
          processedData.sort((a, b) => a.name.localeCompare(b.name))
          break
        }

        case 'alphabetical-desc': {
          processedData.sort((a, b) => b.name.localeCompare(a.name))
          break
        }

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
        processedData: processedData.slice(0, PAGE_SIZE),
      }
    }

    case 'remove-selected': {
      return {
        ...state,
        selected: state.selected.filter((svg) => svg !== action.payload),
      }
    }

    case 'reset': {
      return initCollectionState
    }

    case 'select-all': {
      return {
        ...state,
        selected: state.data.filter((item) => !item.corsRestricted),
      }
    }

    case 'set-canvas-color': {
      return {
        ...state,
        view: {
          ...state.view,
          canvas: action.payload,
        },
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

    case 'set-search': {
      return {
        ...state,
        search: action.payload,
      }
    }

    case 'set-selected': {
      return {
        ...state,
        selected: action.payload,
      }
    }

    case 'set-view': {
      return {
        ...state,
        view: action.payload,
      }
    }

    case 'unselect-all': {
      return {
        ...state,
        selected: [],
      }
    }

    default: {
      return initCollectionState
    }
  }
}
