import type { Image, Svg } from 'svg-gobbler-scripts'

import clsx from 'clsx'
import { HTMLAttributes, forwardRef, useMemo } from 'react'
import { useCollection } from 'src/providers'

import { CardContextMenu } from '../card-context-menu'
import { CardContent } from './card-content'
import { CardOnboarding } from './card-onboarding'
import { CorsRestrictedActions } from './cors-restricted-actions'
import { DefaultActions } from './default-actions'

export type CardProps = HTMLAttributes<HTMLLIElement> & {
  data: Svg
}

export const Card = forwardRef<HTMLLIElement, CardProps>((props, ref) => {
  const { className, data, ...rest } = props
  const { state } = useCollection()

  const Actions = useMemo(() => {
    return data.corsRestricted ? CorsRestrictedActions : DefaultActions
  }, [data.corsRestricted])

  return (
    <CardContextMenu data={data}>
      <li
        {...rest}
        className={clsx(
          'text relative rounded-2xl bg-white dark:bg-gray-800/50',
          'group/card transition-all duration-300 ease-in-out',
          'flex aspect-square items-center justify-center hover:shadow-md',
          className,
        )}
        ref={ref}
      >
        <CardOnboarding data={data}>
          <Actions data={data as Image}>
            <div
              className="relative overflow-hidden transition-all duration-100 ease-in"
              style={{ height: state.view.size, width: state.view.size }}
            >
              <CardContent data={data} />
            </div>
          </Actions>
        </CardOnboarding>
      </li>
    </CardContextMenu>
  )
})
