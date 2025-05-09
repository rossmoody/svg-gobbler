import { html } from '@codemirror/lang-html'
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm'
import CodeMirror, { EditorView } from '@uiw/react-codemirror'
import { merge } from 'lodash'
import { useCallback } from 'react'
import { useDetails, useUser } from 'src/providers'
import { StorageUtilities } from 'src/utilities/storage-utilities'

import { ActionBar } from './action-bar'
import { EditorOnboarding } from './editor-onboarding'

export const DetailsEditor = () => {
  const { dispatch, state } = useDetails()
  const { dispatch: userDispatch, state: userState } = useUser()

  const onChange = useCallback(
    (value: string) => {
      dispatch({ payload: value, type: 'update-current-string' })
    },
    [dispatch],
  )

  const onFocus = useCallback(() => {
    if (!userState.onboarding.viewedEditSvg) {
      const newUser = merge(userState, { onboarding: { viewedEditSvg: true } })
      userDispatch({ payload: newUser, type: 'set-user' })
      StorageUtilities.setStorageData('user', newUser)
    }
  }, [userDispatch, userState])

  return (
    <section className="relative flex-grow">
      <EditorOnboarding />
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
        onFocus={onFocus}
        theme={tokyoNightStorm}
        value={state.currentString}
      />
    </section>
  )
}
