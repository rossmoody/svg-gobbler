import { HelpIcon } from 'src/components'
import { useExport } from 'src/providers'
import { loc } from 'src/utils/i18n'

export const SpriteSettings = () => {
  const { dispatch, state } = useExport()

  function handlePrefixChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'set-sprite-prefix', payload: e.target.value })
  }

  function handleSuffixChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'set-sprite-suffix', payload: e.target.value })
  }

  const useExample = `<use href="#${state.settings.sprite.prefix}icon${state.settings.sprite.suffix}" />`

  return (
    <div>
      <div className="group">
        <span className="flex gap-1">
          <label className="export-label" htmlFor="id-prefix">
            {loc('export_sprite_prefix')}
          </label>
          <HelpIcon content={loc('export_sprite_prefix_tooltip')} />
        </span>
        <input
          className="export-input"
          id="id-prefix"
          type="text"
          onChange={handlePrefixChange}
          value={state.settings.sprite.prefix}
        />
        {state.settings.sprite.prefix && (
          <div className="mt-2 flex flex-col">
            <span className="text-muted text-xs">{useExample}</span>
          </div>
        )}
      </div>
      <div className="group mt-3">
        <span className="flex gap-1">
          <label className="export-label" htmlFor="id-suffix">
            {loc('export_sprite_suffix')}
          </label>
          <HelpIcon content={loc('export_sprite_suffix_tooltip')} />
        </span>
        <input
          className="export-input"
          id="id-suffix"
          type="text"
          onChange={handleSuffixChange}
          value={state.settings.sprite.suffix}
        />
        {state.settings.sprite.suffix && (
          <div className="mt-2 flex flex-col">
            <span className="text-muted text-xs">{useExample}</span>
          </div>
        )}
      </div>
    </div>
  )
}
