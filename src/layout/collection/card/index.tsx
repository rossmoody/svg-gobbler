import clsx from 'clsx'
import { HTMLAttributes, forwardRef } from 'react'
import { PresentationSvg } from 'scripts/svg-factory/presentation-svg'
import { CardContent } from './card-content'

export type CardProps = HTMLAttributes<HTMLLIElement> & {
  data: PresentationSvg
}

export const Card = forwardRef<HTMLLIElement, CardProps>((props, ref) => {
  const { data, ...rest } = props

  return (
    <li
      {...rest}
      ref={ref}
      className={clsx(
        'rounded-2xl p-12 bg-white dark:bg-gray-800 text',
        'flex items-center justify-center flex-grow',
        'min-w-[theme(space.32)] min-h-[theme(space.32)]',
      )}
    >
      <div className="relative h-12 w-12 shrink-0 min-h-60 overflow-hidden">
        <CardContent data={data} />
      </div>
    </li>
  )
})
