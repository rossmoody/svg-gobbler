import clsx from 'clsx'
import { useMainPanel } from 'src/providers'

export const Mainpanel = () => {
  const { state } = useMainPanel()

  return (
    <aside
      className={clsx(
        state.isOpen ? 'w-52 md:w-72' : 'w-0',
        'border-l border-gray-200  shrink-0 overflow-y-auto h-[calc(100dvh-theme(space.16))] transition-all',
      )}
    ></aside>
  )
}
