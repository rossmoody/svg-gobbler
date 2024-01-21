/**
 * The general state of the user and application. Identical state
 * in the local storage under the key `user`.
 */
export type UserState = {
  /**
   * The onboarding state of the user for showing help cards
   * or other friendly onboarding stuff.
   */
  onboarding: {
    /**
     * The user has viewed the tooltip for generating a context menu.
     */
    viewedCardContext: boolean
    /**
     * The user has viewed the tooltip for editing the svg in detail view.
     */
    viewedEditSvg: boolean
  }
}

export type UserAction = { payload: UserState; type: 'set-user' } | { type: 'reset' }

export const initUserState: UserState = {
  onboarding: {
    viewedCardContext: false,
    viewedEditSvg: false,
  },
}

export const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'set-user': {
      return {
        ...state,
        ...action.payload,
      }
    }

    case 'reset': {
      return initUserState
    }

    default: {
      return initUserState
    }
  }
}
