import clsx from 'clsx'
import { useCollection } from 'src/providers'

export const Mainpanel = () => {
  const { state, dispatch } = useCollection()

  return (
    <aside
      className={clsx(
        state.selected.length ? 'w-52 md:w-72' : 'w-0',
        'border-l shrink-0 overflow-y-auto h-[calc(100dvh-theme(space.16))] surface',
        'transition-all border-gray-200 dark:border-gray-800',
      )}
    >
      <header className="flex items-center border-b px-4 border-gray-200 dark:border-gray-800 text h-12">
        <h2 className="font-medium text-base">Export</h2>
      </header>
    </aside>
  )
}
