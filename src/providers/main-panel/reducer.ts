export type MainPanelState = {
  /**
   * Whether the main panel is open or not
   */
  isOpen: boolean
}

export type MainPanelAction = { type: 'reset' } | { type: 'set-open'; payload: boolean }

export const initMainPanelState: MainPanelState = {
  isOpen: false,
}

export const sidebarReducer = (state: MainPanelState, action: MainPanelAction): MainPanelState => {
  switch (action.type) {
    case 'set-open': {
      return { ...state, isOpen: action.payload }
    }

    case 'reset': {
      return initMainPanelState
    }

    default: {
      return initMainPanelState
    }
  }
}
