import messages from '../../_locales/en/messages.json'

export type LocKey = keyof typeof messages

/**
 * Helper for i18n translation.
 */
export const loc = (key: LocKey): string => {
  return chrome.i18n.getMessage(key)
}
