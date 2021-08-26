import strings from '../../../../extension/_locales/en_US/messages.json'

type StringKeys = keyof typeof strings

const loc = (string: StringKeys) => chrome.i18n.getMessage(string)

export default loc
