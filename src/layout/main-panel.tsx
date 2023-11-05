import clsx from 'clsx'

export const Mainpanel = () => {
  return (
    <aside
      className={clsx(
        false ? 'w-52 md:w-72' : 'w-0',
        'border-l shrink-0 overflow-y-auto h-[calc(100dvh-theme(space.16))] transition-all border-gray-200 dark:border-gray-800',
      )}
    ></aside>
  )
}
