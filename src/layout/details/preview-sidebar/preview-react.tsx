import { javascript } from '@codemirror/lang-javascript'
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm'
import CodeMirror, { EditorView } from '@uiw/react-codemirror'
import { debounce } from 'lodash'
import { Button } from 'src/components'
import { useClipboard } from 'src/hooks'
import { useDetails } from 'src/providers'

import { useSvgr } from './use-svgr'

export const PreviewReact = () => {
  const { dispatch, state } = useDetails()
  const { config, result } = state.preview.svgr
  const { copyToClipboard, text } = useClipboard()
  const { loading } = useSvgr()

  const handleBooleanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target
    dispatch({ payload: { key: id, value: checked }, type: 'set-svgr-config-value' })
  }

  const debouncedFunction = debounce((payload) => {
    dispatch({ payload, type: 'set-svgr-state-name' })
  }, 700)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedFunction(e.target.value)
  }

  const handleCopy = () => {
    copyToClipboard(result)
  }

  return (
    <div className="relative h-full border-l border-slate-500/50">
      <Button className="absolute right-4 top-4 z-10" onClick={handleCopy} size="xs">
        {text}
      </Button>
      {!loading && (
        <CodeMirror
          basicSetup={{ highlightActiveLine: false }}
          className="cm-padding-fix h-1/2"
          extensions={[javascript(), EditorView.lineWrapping]}
          readOnly
          theme={tokyoNightStorm}
          value={result}
        />
      )}
      {loading && (
        <div className="flex h-1/2 items-center justify-center">
          <svg height={60} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
              fill="rgb(220, 38, 38)"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                dur="1s"
                from="0 50 50"
                repeatCount="indefinite"
                to="360 50 50"
                type="rotate"
              />
            </path>
          </svg>
        </div>
      )}

      <div className="h-1/2 shrink-0 overflow-auto p-4">
        <header className="mb-4">
          <h2 className="mt-2 text-sm font-medium">SVGR Options</h2>
        </header>

        <div className="mt-6 flex flex-col gap-2">
          <div>
            <label className="export-label" htmlFor="dimensions">
              Component name
            </label>
            <span className="text-muted block pt-1">The name of the exported component</span>
          </div>
          <input
            className="input"
            defaultValue={state.preview.svgr.state.componentName}
            id="name"
            onChange={handleNameChange}
            type="text"
          />
        </div>

        <div className="mt-6 flex gap-2">
          <input
            checked={config.dimensions}
            className="checkbox"
            id="dimensions"
            onChange={handleBooleanChange}
            type="checkbox"
          />
          <div>
            <label className="export-label" htmlFor="dimensions">
              Dimensions
            </label>
            <span className="text-muted block pt-1">
              Keep width and height attributes from the root SVG tag
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <input
            checked={config.ref}
            className="checkbox"
            id="ref"
            onChange={handleBooleanChange}
            type="checkbox"
          />
          <div>
            <label className="export-label" htmlFor="ref">
              Ref
            </label>
            <span className="text-muted block pt-1">Supply a forward ref to the root SVG tag</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <input
            checked={config.native}
            className="checkbox"
            id="native"
            onChange={handleBooleanChange}
            type="checkbox"
          />
          <div>
            <label className="export-label" htmlFor="native">
              Native
            </label>
            <span className="text-muted block pt-1">
              Modify all SVG nodes with uppercase and use a specific template with react-native-svg
              imports. All unsupported nodes will be removed.
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <input
            checked={config.typescript}
            className="checkbox"
            id="typescript"
            onChange={handleBooleanChange}
            type="checkbox"
          />
          <div>
            <label className="export-label" htmlFor="typescript">
              Typescript
            </label>
            <span className="text-muted block pt-1">Generate type definitions for TypeScript</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <input
            checked={config.memo}
            className="checkbox"
            id="memo"
            onChange={handleBooleanChange}
            type="checkbox"
          />
          <div>
            <label className="export-label" htmlFor="memo">
              Memo
            </label>
            <span className="text-muted block pt-1">Wrap component definition in a React.memo</span>
          </div>
        </div>
      </div>
    </div>
  )
}
