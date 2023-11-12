import { Transition } from '@headlessui/react'
import _ from 'lodash'
import { Fragment } from 'react'
import { svgoPlugins } from 'src/data/svgo'
import { useExport } from 'src/providers'
import { SvgoOption } from './svgo-option'

export const SvgSettings = () => {
  const { state, dispatch } = useExport()

  const handleOptimizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'set-optimize-exports', payload: e.target.checked })
  }

  return (
    <Fragment>
      <div className="flex gap-0_5">
        <input
          id="optimize"
          className="checkbox"
          type="checkbox"
          checked={state.optimizeExports}
          onChange={handleOptimizeChange}
        />
        <label htmlFor="optimize" className="export-label mb-4">
          Optimize exports
        </label>
      </div>
      <Transition
        as="div"
        show={state.optimizeExports}
        enter="transition-all duration-300 ease-in-out delay-150"
        enterFrom="opacity-0 h-0"
        enterTo="opacity-100 h-100"
        leave="transition-all duration-300 ease-in-out"
        leaveFrom="opacity-100 h-100"
        leaveTo="opacity-0 h-0"
        className="flex flex-col gap-3"
      >
        <span className="block bg-gray-200 dark:bg-gray-700 h-px my-2" />
        {_.sortBy(svgoPlugins, 'label').map((plugin) => (
          <SvgoOption key={plugin.name} plugin={plugin} />
        ))}
      </Transition>
    </Fragment>
  )
}
