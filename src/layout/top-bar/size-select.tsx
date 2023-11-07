import clsx from 'clsx'
import { useCollection } from 'src/providers'

const sizes = [
  { value: 12, label: '12px' },
  { value: 16, label: '16px' },
  { value: 20, label: '20px' },
  { value: 24, label: '24px' },
  { value: 32, label: '32px' },
  { value: 40, label: '40px' },
  { value: 48, label: '48px' },
  { value: 64, label: '64px' },
  { value: 96, label: '96px' },
  { value: 128, label: '128px' },
  { value: 256, label: '256px' },
]

export const SizeSelect = () => {
  const { state, dispatch } = useCollection()

  function handleSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const view = { ...state.view, size: Number(e.target.value) }
    chrome.storage.local.set({ view })
    dispatch({ type: 'set-view', payload: view })
  }

  return (
    <>
      <label htmlFor="size" className="hidden">
        Size
      </label>
      <select
        id="size"
        value={state.view.size}
        onChange={handleSizeChange}
        className={clsx(
          'text-sm border-none font-semibold rounded-md',
          'h-8 text-center bg-transparent',
          'py-0 px-1.5 cursor-pointer bg-none focus',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
        )}
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
