import { KeyboardShortcut } from './keyboard-shortcut'

export const GeneralSettings = () => {
  const handleOpenKeyboardShortcuts = () => {
    chrome.tabs.update({ url: 'chrome://extensions/shortcuts' })
  }

  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold leading-7">General</h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          Account and user preferences for SVG Gobbler extension.
        </p>
      </div>

      {/* Settings */}
      <div className="sm:max-w-xl sm:grid-cols-6 md:col-span-2">
        <h3 className="text-base font-semibold leading-7">Keyboard shortcut</h3>
        <p className="text-sm text-muted mt-1 leading-6">
          The current shortcut for launching SVG Gobbler is <KeyboardShortcut />. To edit or remove
          this shortcut,{' '}
          <span className="underline cursor-pointer" onClick={handleOpenKeyboardShortcuts}>
            visit the extension shortcuts page
          </span>
          .
        </p>
      </div>
    </div>
  )
}
