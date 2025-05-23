import clsx from 'clsx'
import { useCollection } from 'src/providers'
import { loc } from 'src/utilities/i18n'
import { StorageUtilities } from 'src/utilities/storage-utilities'

export const sizes = [
  { label: '16px', value: 16 },
  { label: '20px', value: 20 },
  { label: '24px', value: 24 },
  { label: '40px', value: 40 },
  { label: '48px', value: 48 },
  { label: '64px', value: 64 },
  { label: '96px', value: 96 },
  { label: '128px', value: 128 },
  { label: '192px', value: 192 },
  { label: '256px', value: 256 },
] as const

export const SizeSelect = () => {
  const { dispatch, state } = useCollection()

  function handleSizeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const view = { ...state.view, size: Number(event.target.value) }
    dispatch({ payload: view, type: 'set-view' })
    StorageUtilities.setStorageData('view', view)
  }

  return (
    <>
      <label className="hidden" htmlFor="size">
        {loc('topbar_size')}
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
