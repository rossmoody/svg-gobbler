import type { Collection } from 'src/types'

export type DashboardAction =
  | { payload: boolean; type: 'set-open' }
  | { payload: Collection; type: 'set-collection-icon' }
  | { payload: Collection[]; type: 'set-collections' }
  | { type: 'reset' }

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

export const initDashboardState: DashboardState = {
  collections: [],
  isOpen: false,
}

export const dashboardReducer = (state: DashboardState, action: DashboardAction) => {
  switch (action.type) {
    case 'reset': {
      return initDashboardState
    }

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

    default: {
      return initDashboardState
    }
  }
}
