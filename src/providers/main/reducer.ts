import { Svg } from 'scripts/svg-factory/svg'

export type MainState = {
  /**
   * Whether the mainbar is open or not
   */
  data: Svg[]
}

export type MainAction = { type: 'reset' } | { type: 'set-data'; payload: Svg[] }

export const initMainState: MainState = {
  data: [],
}

export const sidebarReducer = (state: MainState, action: MainAction): MainState => {
  switch (action.type) {
    case 'set-data': {
      return {
        ...state,
        data: action.payload,
      }
    }

    case 'reset': {
      return initMainState
    }

    default: {
      return initMainState
    }
  }
}
