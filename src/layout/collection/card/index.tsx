import clsx from 'clsx'
import { HTMLAttributes, forwardRef } from 'react'
import type { Image } from 'scripts/svg-classes/image'
import type { Svg } from 'scripts/svg-classes/svg'
import { useCollection } from 'src/providers'
import { CardContent } from './card-content'
import { CorsRestrictedActions } from './cors-restricted-actions'
import { DefaultActions } from './default-actions'

export type CardProps = HTMLAttributes<HTMLLIElement> & {
  data: Svg
}

export const Card = forwardRef<HTMLLIElement, CardProps>((props, ref) => {
  const { data, className, ...rest } = props
  const { state } = useCollection()

  return (
    <li
      {...rest}
      ref={ref}
      className={clsx(
        'text relative rounded-2xl bg-white dark:bg-gray-800/50',
        'group/card transition-all duration-300 ease-in-out',
        'flex aspect-square items-center justify-center',
        className,
      )}
    >
      {!data.corsRestricted && <DefaultActions data={data} />}
      {data.corsRestricted && <CorsRestrictedActions data={data as Image} />}
      <div
        className="relative z-0 shrink-0 overflow-hidden transition-all duration-100 ease-in"
        style={{ height: state.view.size, width: state.view.size }}
      >
        <CardContent data={data} />
      </div>
    </li>
  )
})
