export type SidebarState = {
  /**
   * Whether the sidebar is open or not in mobile contexts.
   */
  isOpen: boolean
}

export type SidebarAction = { type: 'reset' } | { type: 'set-open'; payload: boolean }

export const initSidebarState: SidebarState = {
  isOpen: false,
}

export const sidebarReducer = (state: SidebarState, action: SidebarAction): SidebarState => {
  switch (action.type) {
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
