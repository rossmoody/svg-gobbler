import type { Collection } from 'src/types'

export type DashboardState = {
  /**
   * The collections that are available to the user.
   */
  collections: Collection[]
  /**
   * Whether the sidebar is open or not in mobile contexts.
   */
  isOpen: boolean
}

export type DashboardAction =
  | { payload: Collection; type: 'set-collection-icon' }
  | { payload: Collection[]; type: 'set-collections' }
  | { payload: boolean; type: 'set-open' }
  | { type: 'reset' }

export const initDashboardState: DashboardState = {
  collections: [],
  isOpen: false,
}

export const dashboardReducer = (state: DashboardState, action: DashboardAction) => {
  switch (action.type) {
    case 'set-collection-icon': {
      return {
        ...state,
        collections: state.collections.map((collection) => {
          if (collection.id === action.payload.id) {
            return { ...collection, emoji: action.payload.emoji }
          }

          return collection
        }),
      }
    }

    case 'set-collections': {
      return { ...state, collections: action.payload }
    }

    case 'set-open': {
      return { ...state, isOpen: action.payload }
    }

    case 'reset': {
      return initDashboardState
    }

    default: {
      return initDashboardState
    }
  }
}
