import { Svg } from 'scripts/svg-classes/svg'
import { CollectionData } from 'src/types'

export type CollectionState = CollectionData & {
  /**
   * Processed data is the collection data that is ready to be rendered
   * after going through the filters and sorters and paginators.
   */
  processedData: Svg[]
}

export type CollectionAction =
  | { type: 'reset' }
  | { type: 'process-data' }
  | { type: 'set-data'; payload: Svg[] }
  | { type: 'set-collection-id'; payload: string }
  | { type: 'set-view'; payload: CollectionState['view'] }

export const initCollectionState: CollectionState = {
  data: [],
  processedData: [],
  collectionId: '',
  view: {
    size: 48,
    sort: 'none',
    filters: {
      'hide-cors': false,
    },
  },
}

export const sidebarReducer = (state: CollectionState, action: CollectionAction) => {
  switch (action.type) {
    case 'process-data': {
      let processedData = [...state.data]

      // Process filters
      Object.entries(state.view.filters).forEach(([filter, value]) => {
        switch (filter) {
          case 'hide-cors': {
            if (!value) break
            processedData = processedData.filter((svg) => {
              return svg.asElement instanceof HTMLImageElement
            })
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
