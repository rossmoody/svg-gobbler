import clsx from 'clsx'
import { useCollection } from 'src/providers'
import { Footer } from './footer'
import { Header } from './header'

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
      <div className="flex flex-col px-4 pb-4 pt-2 h-full">
        <Header />
        <div className="flex-grow">
          <label className="label" htmlFor="file-type">
            File type
          </label>
          <select className="select" id="file-type">
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
            <option value="xml">XML</option>
          </select>
        </div>
        <Footer />
      </div>
    </aside>
  )
}
