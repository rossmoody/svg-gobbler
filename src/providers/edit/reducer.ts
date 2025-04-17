export type EditAction =
  | { payload: Record<EditStateKey[number], string>; type: 'set-edit-property-value' }
  | { payload: string; type: 'set-edit-custom-name' }
  | { payload: string; type: 'set-edit-custom-value' }
  | { type: 'reset' }

export type EditState = {
  /**
   * The custom property and value to apply to the selected SVGs.
   */
  custom: {
    /**
     * The name of the property to apply to the selected SVGs.
     */
    name: string
    /**
     * The value of the property to apply to the selected SVGs.
     */
    value: string
  }
  /**
   * The standard properties to apply to the selected SVGs.
   */
  standard: {
    /**
     * The class to apply to the selected SVGs.
     */
    class: string
    /**
     * The fill to apply to the selected SVGs.
     */
    fill: string
    /**
     * The height to apply to the selected SVGs.
     */
    height: string
    /**
     * The id to apply to the selected SVGs.
     */
    id: string
    /**
     * The viewBox to apply to the selected SVGs.
     */
    viewBox: string
    /**
     * The width to apply to the selected SVGs.
     */
    width: string
  }
}

export type EditStateKey = keyof EditState['standard']

export const initEditState: EditState = {
  custom: {
    name: '',
    value: '',
  },
  standard: {
    class: '',
    fill: '',
    height: '',
    id: '',
    viewBox: '',
    width: '',
  },
}

export const editReducer = (state: EditState, action: EditAction): EditState => {
  switch (action.type) {
    case 'reset': {
      return initEditState
    }

    case 'set-edit-custom-name': {
      return {
        ...state,
        custom: {
          ...state.custom,
          name: action.payload,
        },
      }
    }

    case 'set-edit-custom-value': {
      return {
        ...state,
        custom: {
          ...state.custom,
          value: action.payload,
        },
      }
    }

    case 'set-edit-property-value': {
      return {
        ...state,
        standard: {
          ...state.standard,
          ...action.payload,
        },
      }
    }

    default: {
      return state
    }
  }
}
