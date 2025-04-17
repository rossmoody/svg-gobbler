import { forwardRef } from 'react'

import {
  buttonBaseStyles as buttonBaseStyles,
  ButtonProperties as ButtonProperties,
  buttonVariantStyles as buttonVariantStyles,
} from '.'

type IconButtonProperties = ButtonProperties

/**
 * General Icon Button component.
 * 20px icons are used for all sizes except xs, which uses 16px icons.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProperties>(
  (properties, reference) => {
    const { className, size = 'md', type = 'button', variant = 'primary', ...rest } = properties

    const sizeStyles = {
      lg: 'px-2 py-2',
      md: 'px-1.5 py-1.5',
      sm: 'px-1 py-1',
      xl: 'px-2.5 py-2.5',
      xs: 'px-1 py-1',
    }

    const combinedClassName = `${buttonBaseStyles} ${buttonVariantStyles[variant]} ${sizeStyles[size]} ${className}`

    return <button ref={reference} {...rest} className={combinedClassName} type={type} />
  },
)
