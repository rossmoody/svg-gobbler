import { html } from '@codemirror/lang-html'
import { EditorView } from '@codemirror/view'
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm'
import CodeMirror from '@uiw/react-codemirror'
import { merge } from 'lodash'
import { useCallback } from 'react'
import { useDetails, useUser } from 'src/providers'
import { StorageUtils } from 'src/utils/storage-utils'

import { ActionBar } from './action-bar'
import { EditorOnboarding } from './editor-onboarding'

export const DetailsEditor = () => {
  const { dispatch, state } = useDetails()
  const { dispatch: userDispatch, state: userState } = useUser()

  const onChange = useCallback(
    (val: string) => {
      dispatch({ payload: val, type: 'update-current-string' })
    },
    [dispatch],
  )

  const onBlur = useCallback(() => {
    if (!userState.onboarding.viewedEditSvg) {
      const newUser = merge(userState, { onboarding: { viewedEditSvg: true } })
      userDispatch({ payload: newUser, type: 'set-user' })
      StorageUtils.setStorageData('user', newUser)
    }
  }, [userDispatch, userState])

  return (
    <EditorOnboarding>
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
          onBlur={onBlur}
          onChange={onChange}
          theme={tokyoNightStorm}
          value={state.currentString}
        />
      </section>
    </EditorOnboarding>
  )
}
