import { Transition } from '@headlessui/react'
import _ from 'lodash'
import { Fragment } from 'react'
import { HelpIcon } from 'src/components'
import { svgoPlugins } from 'src/constants/svgo-plugins'
import { useExport } from 'src/providers'
import { loc } from 'src/utils/i18n'

import { ResetButton } from './reset-button'
import { SvgoOption } from './svgo-option'

export const SvgSettings = () => {
  const { dispatch, state } = useExport()

  const handleOptimizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: e.target.checked, type: 'set-optimize-exports' })
  }

  const handlePrettifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: e.target.checked, type: 'set-prettify' })
  }

  const handleFloatPrecisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: Number(e.target.value), type: 'set-float-precision' })
  }

  return (
    <Fragment>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            checked={state.settings.svg.optimizeExports}
            className="checkbox"
            id="optimize"
            onChange={handleOptimizeChange}
            type="checkbox"
          />
          <label className="export-label" htmlFor="optimize">
            {loc('export_optimize_exports')}
          </label>
        </div>
        <div className="flex gap-2">
          <input
            checked={state.settings.svg.prettify}
            className="checkbox"
            id="prettify"
            onChange={handlePrettifyChange}
            type="checkbox"
          />
          <label className="export-label" htmlFor="prettify">
            {loc('export_pretty')}
          </label>
        </div>
        <div>
          <div className="group mb-1 mt-2 flex items-center gap-1">
            <label className="export-label" htmlFor="float-precision">
              {loc('export_floating')}
            </label>
            <HelpIcon content="Precision of floating point numbers. Will be passed to each plugin that supports this param." />
          </div>
          <input
            className="input"
            id="float-precision"
            max="10"
            min="1"
            onChange={handleFloatPrecisionChange}
            type="number"
            value={state.settings.svg.floatPrecision}
          />
        </div>
      </div>
      <span className="mb-5 mt-6 block h-px bg-gray-200 dark:bg-gray-700" />
      <Transition
        as="div"
        className="flex flex-col gap-3 pb-8"
        enter="transition-all duration-300 ease-in-out delay-150"
        enterFrom="opacity-0 h-0"
        enterTo="opacity-100 h-100"
        leave="transition-all duration-300 ease-in-out"
        leaveFrom="opacity-100 h-100"
        leaveTo="opacity-0 h-0"
        show={state.settings.svg.optimizeExports}
      >
        <div className="flex items-center justify-between">
          <h2 className="my-2 text-sm font-medium leading-none">{loc('details_plugin')}</h2>
          <ResetButton />
        </div>
        {_.sortBy(svgoPlugins, 'label').map((plugin) => (
          <SvgoOption key={plugin.name} plugin={plugin} />
        ))}
      </Transition>
    </Fragment>
  )
}
