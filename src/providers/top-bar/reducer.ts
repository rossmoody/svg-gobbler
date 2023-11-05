export type TopBarState = {
  /**
   * Whether the mainpanel is open or not
   */
  isOpen: boolean
}

export type TopBarAction = { type: 'reset' } | { type: 'set-open'; payload: boolean }

export const initTopBarState: TopBarState = {
  isOpen: false,
}

export const sidebarReducer = (state: TopBarState, action: TopBarAction): TopBarState => {
  switch (action.type) {
    case 'set-open': {
      return { ...state, isOpen: action.payload }
    }

    case 'reset': {
      return initTopBarState
    }

    default: {
      return initTopBarState
    }
  }
}
