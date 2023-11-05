import { ButtonHTMLAttributes, forwardRef } from 'react'

export const btnBaseStyles =
  'rounded-md flex items-center gap-1 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-all duration-200 ease-in-out'

export const btnVariantStyles = {
  primary: 'bg-red-600 hover:bg-red-500 text-white shadow-sm',
  secondary:
    'ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-sm',
  ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
}

const sizeStyles = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-2 py-1 text-sm',
  md: 'px-2.5 py-1.5 text-sm',
  lg: 'px-3 py-2 text-base',
  xl: 'px-3.5 py-2.5 text-base',
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof btnVariantStyles
  size?: keyof typeof sizeStyles
}

/**
 * General Button component.
 * Uses 20px icons for all sizes except xs, which uses 16px icons.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', ...rest }, ref) => {
    const combinedClassName = [
      btnBaseStyles,
      btnVariantStyles[variant],
      sizeStyles[size],
      className,
    ]
      .join(' ')
      .trim()

    return <button ref={ref} className={combinedClassName} {...rest} />
  },
)
