import strings from '../../../_locales/en/messages.json'

type StringKeys = keyof typeof strings

const loc = (string: StringKeys) => chrome.i18n.getMessage(string)

export default loc
