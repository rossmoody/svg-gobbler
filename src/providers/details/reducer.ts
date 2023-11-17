export type DetailsState = {
  /**
   * The original svg string upon load.
   */
  originalString: string
  /**
   * The current svg string.
   */
  currentString: string
}

export type DetailsAction = { type: 'reset' } | { type: 'init'; payload: string }

export const initDetailsState: DetailsState = {
  originalString: '',
  currentString: '',
}

export const detailsReducer = (state: DetailsState, action: DetailsAction): DetailsState => {
  switch (action.type) {
    case 'init': {
      return {
        ...state,
        originalString: action.payload,
        currentString: action.payload,
      }
    }

    case 'reset': {
      return initDetailsState
    }

    default: {
      return initDetailsState
    }
  }
}
