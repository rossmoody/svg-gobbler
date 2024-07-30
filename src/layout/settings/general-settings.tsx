import { loc } from 'src/utils/i18n'

import { Category } from './category'
import { Item } from './item'
import { KeyboardShortcut } from './keyboard-shortcut'

export const GeneralSettings = () => {
  const handleOpenKeyboardShortcuts = () => {
    chrome.tabs.update({ url: 'chrome://extensions/shortcuts' })
  }

  return (
    <Category description={loc('settings_general_desc')} title={loc('settings_general')}>
      <Item>
        <Item.Setting>
          <Item.Heading>{loc('settings_kbd')}</Item.Heading>
          <Item.Description>
            {loc('settings_kbd_desc')} <KeyboardShortcut />. {loc('settings_kbd_desc_2')},{' '}
            <span className="anchor" onClick={handleOpenKeyboardShortcuts}>
              {loc('settings_kbd_desc_3')}
            </span>
            .
          </Item.Description>
        </Item.Setting>
        <Item.Setting>
          <Item.Heading>{loc('settings_kbd')}</Item.Heading>
          <Item.Description>
            {loc('settings_kbd_desc')} <KeyboardShortcut />. {loc('settings_kbd_desc_2')},{' '}
            <span className="anchor" onClick={handleOpenKeyboardShortcuts}>
              {loc('settings_kbd_desc_3')}
            </span>
            .
          </Item.Description>
        </Item.Setting>
      </Item>
    </Category>
  )
}
