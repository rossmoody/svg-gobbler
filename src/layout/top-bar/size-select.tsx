import clsx from 'clsx'

const sizes = [
  { value: 8, label: '8px' },
  { value: 10, label: '10px' },
  { value: 12, label: '12px' },
  { value: 16, label: '16px' },
  { value: 20, label: '20px' },
  { value: 24, label: '24px' },
  { value: 28, label: '28px' },
  { value: 32, label: '32px' },
  { value: 36, label: '36px' },
  { value: 40, label: '40px' },
  { value: 48, label: '48px' },
  { value: 64, label: '64px' },
  { value: 96, label: '96px' },
  { value: 128, label: '128px' },
  { value: 256, label: '256px' },
]

export const SizeSelect = () => {
  return (
    <>
      <label htmlFor="size" className="hidden">
        Size
      </label>
      <select
        id="size"
        name="size"
        defaultValue="Canada"
        className={clsx(
          'text-sm border-none font-semibold rounded-md',
          'focus:ring-0 h-8 text-center bg-transparent',
          'py-0 px-1.5 cursor-pointer bg-none',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-red-600',
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
