export type EditAction = { type: 'reset' }

export type EditState = {
  /**
   * The height to apply to the selected SVGs.
   */
  height: string
  /**
   * The width to apply to the selected SVGs.
   */
  width: string
}

export const initEditState: EditState = {
  height: '',
  width: '',
}

export const editReducer = (state: EditState, action: EditAction): EditState => {
  switch (action.type) {
    case 'reset': {
      return initEditState
    }

    default: {
      return state
    }
  }
}
