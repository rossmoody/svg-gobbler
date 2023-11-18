import { html } from '@codemirror/lang-html'
import { EditorView } from '@codemirror/view'
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm'
import CodeMirror from '@uiw/react-codemirror'
import { useCallback } from 'react'
import { useDetails } from 'src/providers'

export const DetailsEditor = () => {
  const { state, dispatch } = useDetails()

  const onChange = useCallback(
    (val: string) => {
      dispatch({ type: 'update-current-string', payload: val })
    },
    [dispatch],
  )

  return (
    <section className="relative flex-grow">
      <div className="absolute inset-y-0 left-0 z-50 w-[1px] cursor-ew-resize hover:bg-red-100" />
      <div className="absolute inset-y-1/2 left-1 z-50 h-12 w-1 rounded bg-gray-500/30" />
      <CodeMirror
        onChange={onChange}
        value={state.currentString}
        theme={tokyoNightStorm}
        extensions={[html(), EditorView.lineWrapping]}
        className="h-full"
        basicSetup={{
          autocompletion: true,
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
          lineNumbers: false,
        }}
      />
      <div className="absolute inset-y-1/2 right-1 z-50 h-12 w-1 rounded bg-gray-500/30" />
      <div className="absolute inset-y-0 right-0 z-50 w-[1px] cursor-ew-resize hover:bg-red-100" />
    </section>
  )
}
