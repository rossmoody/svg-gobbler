import clsx from 'clsx'
import { useCollection } from 'src/providers'

export const Mainpanel = () => {
  const { state } = useCollection()

  const panelStyle = {
    width: state.selected.length ? '18rem' : '0',
    transition: 'width 150ms ease-in',
  }

  return (
    <aside
      style={panelStyle}
      className={clsx(
        'border-l shrink-0 overflow-y-auto h-[calc(100dvh-theme(space.16))] surface',
        'transition-width duration-500 ease-in border-gray-200 dark:border-gray-800',
      )}
    >
      <header className="flex items-center border-b px-4 border-gray-200 dark:border-gray-800 text h-12">
        <h2 className="font-medium text-base">Export</h2>
      </header>
    </aside>
  )
}
