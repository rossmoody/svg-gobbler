import { Category } from './category'
import { KeyboardShortcut } from './keyboard-shortcut'

export const GeneralSettings = () => {
  const handleOpenKeyboardShortcuts = () => {
    chrome.tabs.update({ url: 'chrome://extensions/shortcuts' })
  }

  return (
    <Category
      description="Customize how SVG Gobbler works in your browser. These settings are specific to this browser profile."
      title="General"
    >
      <div className="sm:max-w-xl sm:grid-cols-6 md:col-span-2">
        <h3 className="text-base font-semibold leading-7">Keyboard shortcut</h3>
        <p className="text-muted mt-1 text-sm leading-6">
          The current shortcut for launching SVG Gobbler is <KeyboardShortcut />. To edit or remove
          this shortcut,{' '}
          <span className="anchor" onClick={handleOpenKeyboardShortcuts}>
            visit the extension shortcuts page
          </span>
          .
        </p>
      </div>
    </Category>
  )
}
