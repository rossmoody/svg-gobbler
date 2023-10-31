import clsx from 'clsx'
import { useEffect } from 'react'
import { useMainPanel } from 'src/providers/mainpanel'

export const Mainpanel = () => {
  const { state, dispatch } = useMainPanel()

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'k') {
        dispatch({ type: 'set-open', payload: !state.isOpen })
      }
    }
    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [dispatch, state.isOpen])

  return (
    <aside
      className={clsx(
        state.isOpen ? 'w-52 md:w-72' : 'w-0',
        'border-l border-gray-200  shrink-0 overflow-y-auto h-[calc(100dvh-theme(space.16))] transition-all',
      )}
    ></aside>
  )
}
