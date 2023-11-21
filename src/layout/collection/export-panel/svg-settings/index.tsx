import { Transition } from '@headlessui/react'
import _ from 'lodash'
import { Fragment } from 'react'
import { HelpIcon } from 'src/components'
import { svgoPlugins } from 'src/data/svgo-plugins'
import { useExport } from 'src/providers'
import { ResetButton } from './reset-button'
import { SvgoOption } from './svgo-option'

export const SvgSettings = () => {
  const { state, dispatch } = useExport()

  const handleOptimizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'set-optimize-exports', payload: e.target.checked })
  }

  const handlePrettifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'set-prettify', payload: e.target.checked })
  }

  const handleFloatPrecisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'set-float-precision', payload: Number(e.target.value) })
  }

  return (
    <Fragment>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            id="optimize"
            className="checkbox"
            type="checkbox"
            checked={state.settings.svg.optimizeExports}
            onChange={handleOptimizeChange}
          />
          <label htmlFor="optimize" className="export-label">
            Optimize exports
          </label>
        </div>
        <div className="flex gap-2">
          <input
            id="prettify"
            className="checkbox"
            type="checkbox"
            checked={state.settings.svg.prettify}
            onChange={handlePrettifyChange}
          />
          <label htmlFor="prettify" className="export-label">
            Prettify output
          </label>
        </div>
        <div>
          <div className="group mt-2 flex items-center gap-1">
            <label htmlFor="float-precision" className="export-label mb-1">
              Floating precision
            </label>
            <HelpIcon content="Precision of floating point numbers. Will be passed to each plugin that supports this param." />
          </div>
          <input
            id="float-precision"
            type="number"
            min="1"
            max="10"
            value={state.settings.svg.floatPrecision}
            onChange={handleFloatPrecisionChange}
            className="input"
          />
        </div>
      </div>
      <span className="mb-5 mt-6 block h-px bg-gray-200 dark:bg-gray-700" />
      <Transition
        as="div"
        show={state.settings.svg.optimizeExports}
        enter="transition-all duration-300 ease-in-out delay-150"
        enterFrom="opacity-0 h-0"
        enterTo="opacity-100 h-100"
        leave="transition-all duration-300 ease-in-out"
        leaveFrom="opacity-100 h-100"
        leaveTo="opacity-0 h-0"
        className="flex flex-col gap-3 pb-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="my-2 text-sm font-medium leading-none">Plugins</h2>
          <ResetButton />
        </div>
        {_.sortBy(svgoPlugins, 'label').map((plugin) => (
          <SvgoOption key={plugin.name} plugin={plugin} />
        ))}
      </Transition>
    </Fragment>
  )
}
