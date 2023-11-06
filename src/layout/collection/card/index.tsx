import clsx from 'clsx'
import { HTMLAttributes, forwardRef } from 'react'
import { PresentationSvg } from 'scripts/svg-classes/presentation-svg'
import { useCollection } from 'src/providers'
import { CardContent } from './card-content'

export type CardProps = HTMLAttributes<HTMLLIElement> & {
  data: PresentationSvg
}

export const Card = forwardRef<HTMLLIElement, CardProps>((props, ref) => {
  const { data, ...rest } = props
  const { state } = useCollection()

  return (
    <li
      {...rest}
      ref={ref}
      className={clsx(
        'rounded-2xl p-12 text bg-white dark:bg-gray-800 ',
        'transition-all duration-300 ease-in-out',
        'flex items-center justify-center flex-grow',
        'min-w-[theme(space.32)] min-h-[theme(space.32)]',
      )}
    >
      <div
        className={`relative shrink-0 min-h-60 overflow-hidden transition-all duration-300 ease-in-out [& > img]:flex`}
        style={{ height: state.view.size, width: state.view.size }}
      >
        <CardContent data={data} />
      </div>
    </li>
  )
})
