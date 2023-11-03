import { ButtonHTMLAttributes, forwardRef } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { variant = 'primary', size = 'md', className, ...rest } = props

  const baseStyles =
    'rounded-md flex items-center font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-alls'

  const variantStyles = {
    primary: 'bg-red-600 hover:bg-red-500 text-white shadow-sm',
    secondary: 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 shadow-sm',
    ghost: 'bg-transparent text-gray-900 hover:bg-gray-100',
  }

  const sizeStyles = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-2 py-1 text-sm',
    md: 'px-2.5 py-1.5 text-sm',
    lg: 'px-3 py-2 text-sm',
    xl: 'px-3.5 py-2.5 text-sm',
  }

  const combinedClassName = `${className} ${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`

  return <button ref={ref} {...rest} className={combinedClassName} />
})