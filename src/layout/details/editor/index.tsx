import { html } from '@codemirror/lang-html'
import { EditorView } from '@codemirror/view'
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm'
import CodeMirror from '@uiw/react-codemirror'
import { useCallback } from 'react'
import { useDetails } from 'src/providers'

import { ActionBar } from './action-bar'

export const DetailsEditor = () => {
  const { dispatch, state } = useDetails()

  const onChange = useCallback(
    (val: string) => {
      dispatch({ payload: val, type: 'update-current-string' })
    },
    [dispatch],
  )

  return (
    <section className="relative flex-grow">
      <ActionBar />
      <CodeMirror
        basicSetup={{
          autocompletion: true,
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
          lineNumbers: false,
        }}
        className="h-full"
        extensions={[html(), EditorView.lineWrapping]}
        onChange={onChange}
        theme={tokyoNightStorm}
        value={state.currentString}
      />
    </section>
  )
}
