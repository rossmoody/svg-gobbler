import { HTMLAttributes, forwardRef } from 'react'
import { PresentationSvg } from 'scripts/svg-factory/presentation-svg'
import { CardContent } from './card-content'

export type CardProps = HTMLAttributes<HTMLLIElement> & {
  data: PresentationSvg
}

export const Card = forwardRef<HTMLLIElement, CardProps>((props, ref) => {
  const { data, ...rest } = props

  return (
    <li {...rest} ref={ref} className="rounded-2xl p-8 bg-white dark:bg-gray-800">
      <div className="relative h-0 w-full p-0 overflow-hidden" style={{ paddingBottom: '100%' }}>
        <CardContent data={data} />
      </div>
    </li>
  )
})
