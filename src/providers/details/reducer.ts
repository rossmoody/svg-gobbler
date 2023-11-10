export type DetailsState = {
  /**
   * The original unmodified string of the SVG.
   */
  originalString: string
}

export type DetailsAction = { type: 'reset' } | { type: 'init'; payload: string }

export const initDetailsState: DetailsState = {
  originalString: '',
}

export const detailsReducer = (state: DetailsState, action: DetailsAction): DetailsState => {
  switch (action.type) {
    case 'init': {
      return {
        ...state,
        originalString: action.payload,
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
