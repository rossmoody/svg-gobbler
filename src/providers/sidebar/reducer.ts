import { Collection } from 'types'

export type SidebarState = {
  /**
   * Whether the sidebar is open or not in mobile contexts.
   */
  isOpen: boolean
  /**
   * The collections that are available to the user.
   */
  collections: Collection[]
}

export type SidebarAction =
  | { type: 'reset' }
  | { type: 'set-open'; payload: boolean }
  | { type: 'set-collections'; payload: Collection[] }
  | { type: 'remove-collection'; payload: Collection }

export const initSidebarState: SidebarState = {
  isOpen: false,
  collections: [],
}

export const sidebarReducer = (state: SidebarState, action: SidebarAction): SidebarState => {
  switch (action.type) {
    case 'remove-collection': {
      const collections = state.collections.filter(({ id }) => id !== action.payload.id)
      chrome.storage.local.set({ collections })
      return { ...state, collections }
    }

    case 'set-collections': {
      return { ...state, collections: action.payload }
    }

    case 'set-open': {
      return { ...state, isOpen: action.payload }
    }

    case 'reset': {
      return initSidebarState
    }

    default: {
      return initSidebarState
    }
  }
}
