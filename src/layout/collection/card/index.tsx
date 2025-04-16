import type { SvgType } from 'src/scripts'

import clsx from 'clsx'
import { forwardRef, HTMLAttributes, useMemo } from 'react'
import { useCollection } from 'src/providers'

import { CardContent } from './card-content'
import { CorsRestrictedActions } from './cors-restricted-actions'
import { DefaultActions } from './default-actions'
import { SvgSize } from './svg-size'

export type CardData = {
  data: SvgType
}

export type CardProps = CardData & HTMLAttributes<HTMLDivElement>

export const Card = forwardRef<HTMLDivElement, CardProps>((properties, reference) => {
  const { className, data, ...rest } = properties
  const { state } = useCollection()

  const Actions = useMemo(() => {
    return data.corsRestricted ? CorsRestrictedActions : DefaultActions
  }, [data.corsRestricted])

  return (
    <div
      {...rest}
      className={clsx(
        state.view.filters['show-name'] && 'rounded-b-none',
        'text relative rounded-2xl',
        'group/card transition-all duration-300 ease-in-out',
        'flex aspect-square items-center justify-center',
        className,
      )}
      ref={reference}
    >
      <SvgSize data={data} />
      <Actions data={data}>
        <div
          className="relative overflow-hidden transition-all duration-100 ease-in"
          style={{ height: state.view.size, width: state.view.size }}
        >
          <CardContent data={data} />
        </div>
      </Actions>
    </div>
  )
})
