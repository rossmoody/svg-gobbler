import { ButtonHTMLAttributes, forwardRef } from 'react'

import { Spinner } from './spinner'

export const buttonBaseStyles =
  'rounded-lg flex items-center gap-1 font-semibold transition-all duration-200 ease-in-out focus justify-center'

export const buttonVariantStyles = {
  destructive:
    'ring-1 ring-inset ring-red-300 dark:ring-red-700 hover:bg-red-100 dark:hover:bg-red-800 shadow-sm text-red-600',
  ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
  primary: 'bg-red-600 hover:bg-red-500 text-white shadow-sm',
  secondary:
    'ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-sm',
}

export const buttonSizeStyles = {
  lg: 'px-3 py-2 text-base',
  md: 'px-2.5 py-1.5 text-sm',
  sm: 'px-2 py-1 text-sm',
  xl: 'px-3.5 py-2.5 text-base',
  xs: 'px-2 py-1 text-xs',
}

export type ButtonProperties = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  size?: keyof typeof buttonSizeStyles
  variant?: keyof typeof buttonVariantStyles
}

/**
 * General Button component.
 * Uses 20px icons for all sizes except xs, which uses 16px icons.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProperties>(
  (
    {
      children,
      className = '',
      disabled,
      loading,
      size = 'md',
      type = 'button',
      variant = 'primary',
      ...rest
    },
    reference,
  ) => {
    const combinedClassName = [
      buttonBaseStyles,
      buttonVariantStyles[variant],
      buttonSizeStyles[size],
      className,
    ]
      .join(' ')
      .trim()

    return (
      <button
        className={combinedClassName}
        ref={reference}
        {...rest}
        aria-busy={loading}
        disabled={disabled || loading}
        type={type}
      >
        {loading ? <Spinner className="h-6 w-6" /> : children}
      </button>
    )
  },
)
