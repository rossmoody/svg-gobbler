import clsx from 'clsx'
import { forwardRef, HTMLAttributes } from 'react'

type BadgeProperties = HTMLAttributes<HTMLSpanElement> & {
  text: string
  variant?: BadgeVariant
}

type BadgeVariant = 'blue' | 'gray' | 'green' | 'indigo' | 'pink' | 'purple' | 'red' | 'yellow'

const variantStyles: Record<BadgeVariant, string> = {
  blue: 'bg-blue-50 text-blue-700 ring-blue-700/10',
  gray: 'bg-gray-50 text-gray-600 ring-gray-500/10',
  green: 'bg-green-50 text-green-700 ring-green-600/20',
  indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-700/10',
  pink: 'bg-pink-50 text-pink-700 ring-pink-700/10',
  purple: 'bg-purple-50 text-purple-700 ring-purple-700/10',
  red: 'bg-red-50 text-red-700 ring-red-600/10',
  yellow: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProperties>((properties, reference) => {
  const { className, text, variant = 'gray', ...rest } = properties
  const classes = clsx(
    'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
    variantStyles[variant],
    className,
  )

  return (
    <span className={classes} ref={reference} {...rest}>
      {text}
    </span>
  )
})
