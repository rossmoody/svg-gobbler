import { forwardRef } from 'react'
import { ButtonProps, btnBaseStyles, btnVariantStyles } from '.'

type IconButtonProps = ButtonProps

/**
 * General Icon Button component.
 * 20px icons are used for all sizes except xs, which uses 16px icons.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { variant = 'primary', size = 'md', className, ...rest } = props

  const sizeStyles = {
    xs: 'px-1 py-1',
    sm: 'px-1 py-1',
    md: 'px-1.5 py-1.5',
    lg: 'px-2 py-2',
    xl: 'px-2.5 py-2.5',
  }

  const combinedClassName = `${className} ${btnBaseStyles} ${btnVariantStyles[variant]} ${sizeStyles[size]}`

  return <button ref={ref} {...rest} className={combinedClassName} />
})
