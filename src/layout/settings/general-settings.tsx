import { loc } from 'src/utils/i18n'

import { Category } from './category'
import { KeyboardShortcut } from './keyboard-shortcut'

export const GeneralSettings = () => {
  const handleOpenKeyboardShortcuts = () => {
    chrome.tabs.update({ url: 'chrome://extensions/shortcuts' })
  }

  return (
    <Category description={loc('settings_general_desc')} title={loc('settings_general')}>
      <div className="sm:max-w-xl sm:grid-cols-6 md:col-span-2">
        <h3 className="text-base font-semibold leading-7">{loc('settings_kbd')}</h3>
        <p className="text-muted mt-1 text-sm leading-6">
          {loc('settings_kbd_desc')} <KeyboardShortcut />. {loc('settings_kbd_desc_2')},{' '}
          <span className="anchor" onClick={handleOpenKeyboardShortcuts}>
            {loc('settings_kbd_desc_3')}
          </span>
          .
        </p>
      </div>
    </Category>
  )
}
