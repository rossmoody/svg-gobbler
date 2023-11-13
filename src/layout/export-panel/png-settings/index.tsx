import { InformationCircleIcon } from '@heroicons/react/24/solid'
import { Tooltip } from 'src/components'
import { useExport } from 'src/providers'

export const PngSettings = () => {
  const { state, dispatch } = useExport()

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'set-png-size', payload: Number(e.target.value) })
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="flex gap-1 items-center">
          <label className="export-label" htmlFor="size">
            Size
          </label>
          <Tooltip content="Applied to the largest side (height or width) of the image while scaling proportionally.">
            <InformationCircleIcon className="w-4 h-4 text-gray-400 hover:cursor-help" />
          </Tooltip>
        </div>
        <input
          type="text"
          className="export-input"
          id="size"
          value={state.settings.png.size}
          onChange={handleSizeChange}
        />
      </div>
    </div>
  )
}
