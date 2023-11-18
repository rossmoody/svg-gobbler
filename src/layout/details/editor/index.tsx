import { html } from '@codemirror/lang-html'
import { EditorView } from '@codemirror/view'
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm'
import CodeMirror from '@uiw/react-codemirror'
import { useCallback } from 'react'
import { useDetails } from 'src/providers'
import { ActionBar } from './action-bar'

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
      <ActionBar />
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
    </section>
  )
}
