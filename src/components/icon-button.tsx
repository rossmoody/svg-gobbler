import { forwardRef } from 'react'

import { ButtonProps, btnBaseStyles, btnVariantStyles } from '.'

type IconButtonProps = ButtonProps

/**
 * General Icon Button component.
 * 20px icons are used for all sizes except xs, which uses 16px icons.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { className, size = 'md', type = 'button', variant = 'primary', ...rest } = props

  const sizeStyles = {
    lg: 'px-2 py-2',
    md: 'px-1.5 py-1.5',
    sm: 'px-1 py-1',
    xl: 'px-2.5 py-2.5',
    xs: 'px-1 py-1',
  }

  const combinedClassName = `${className} ${btnBaseStyles} ${btnVariantStyles[variant]} ${sizeStyles[size]}`

  return <button ref={ref} {...rest} className={combinedClassName} type={type} />
})
