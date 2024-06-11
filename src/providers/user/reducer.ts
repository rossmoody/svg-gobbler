/**
 * The general state of the user and application. Identical state
 * in the local storage under the key `user`.
 */
export type UserState = {
  /**
   * The date the user installed/first initialized the application.
   */
  installDate: string
  /**
   * The onboarding state of the user for showing help cards
   * or other friendly onboarding stuff.
   */
  onboarding: {
    /**
     * The user has viewed the tooltip for editing the svg in detail view.
     */
    viewedEditSvg: boolean
    /**
     * The user has viewed the request for features modal.
     */
    viewedFeatureRequest: boolean
    /**
     * The user has viewed the tooltip for submitting a review.
     */
    viewedReview: boolean
  }
}

export type UserAction = { payload: UserState; type: 'set-user' } | { type: 'reset' }

export const initUserState: UserState = {
  installDate: new Date().toISOString(),
  onboarding: {
    viewedEditSvg: false,
    viewedFeatureRequest: false,
    viewedReview: false,
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
