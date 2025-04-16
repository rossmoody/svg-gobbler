import { ButtonHTMLAttributes, forwardRef } from 'react'

export const btnBaseStyles =
  'rounded-lg flex items-center gap-1 font-semibold transition-all duration-200 ease-in-out focus justify-center'

export const btnVariantStyles = {
  destructive:
    'ring-1 ring-inset ring-red-300 dark:ring-red-700 hover:bg-red-100 dark:hover:bg-red-800 shadow-sm text-red-600',
  ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
  primary: 'bg-red-600 hover:bg-red-500 text-white shadow-sm',
  secondary:
    'ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-sm',
}

export const btnSizeStyles = {
  lg: 'px-3 py-2 text-base',
  md: 'px-2.5 py-1.5 text-sm',
  sm: 'px-2 py-1 text-sm',
  xl: 'px-3.5 py-2.5 text-base',
  xs: 'px-2 py-1 text-xs',
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: keyof typeof btnSizeStyles
  variant?: keyof typeof btnVariantStyles
}

/**
 * General Button component.
 * Uses 20px icons for all sizes except xs, which uses 16px icons.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', size = 'md', type = 'button', variant = 'primary', ...rest }, reference) => {
    const combinedClassName = [
      btnBaseStyles,
      btnVariantStyles[variant],
      btnSizeStyles[size],
      className,
    ]
      .join(' ')
      .trim()

    return <button className={combinedClassName} ref={reference} {...rest} type={type} />
  },
)
