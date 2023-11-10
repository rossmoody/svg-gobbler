import clsx from 'clsx'
import { HTMLAttributes, forwardRef } from 'react'
import { CardSvg } from 'src/layout/collection/card/card-svg'
import { useCollection } from 'src/providers'
import { CardContent } from './card-content'
import { CorsRestrictedActions } from './cors-restricted-actions'
import { DefaultActions } from './default-actions'

export type CardProps = HTMLAttributes<HTMLLIElement> & {
  data: CardSvg
}

export const Card = forwardRef<HTMLLIElement, CardProps>((props, ref) => {
  const { data, className, ...rest } = props
  const { state } = useCollection()

  return (
    <li
      {...rest}
      ref={ref}
      className={clsx(
        'relative rounded-2xl text bg-white dark:bg-gray-800/50',
        'transition-all duration-300 ease-in-out group/card',
        'flex items-center justify-center aspect-square',
        className,
      )}
    >
      {!data.svg.corsRestricted && <DefaultActions data={data} />}
      {data.svg.corsRestricted && <CorsRestrictedActions data={data} />}
      <div
        className="relative shrink-0 overflow-hidden transition-all duration-150 ease-in z-0"
        style={{ height: state.view.size, width: state.view.size }}
      >
        <CardContent data={data} />
      </div>
    </li>
  )
})
