import clsx from 'clsx'
import { useCollection } from 'src/providers'
import { StorageUtils } from 'src/utils/storage-utils'

export const sizes = [
  { label: '16px', value: 16 },
  { label: '20px', value: 20 },
  { label: '24px', value: 24 },
  { label: '40px', value: 40 },
  { label: '64px', value: 64 },
  { label: '96px', value: 96 },
  { label: '128px', value: 128 },
  { label: '256px', value: 256 },
] as const

export const SizeSelect = () => {
  const { dispatch, state } = useCollection()

  function handleSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const view = { ...state.view, size: Number(e.target.value) }
    dispatch({ payload: view, type: 'set-view' })
    StorageUtils.setStorageData('view', view)
  }

  return (
    <>
      <label className="hidden" htmlFor="size">
        Size
      </label>
      <select
        className={clsx(
          'focus h-8 rounded-md border-0 bg-transparent text-center text-sm font-semibold',
          'cursor-pointer bg-none px-1.5 py-0 hover:bg-gray-100 dark:hover:bg-gray-800',
          'focus:ring-0',
        )}
        id="size"
        onChange={handleSizeChange}
        value={state.view.size}
      >
        {sizes.map((size) => (
          <option key={size.value} value={size.value}>
            {size.label}
          </option>
        ))}
      </select>
    </>
  )
}
