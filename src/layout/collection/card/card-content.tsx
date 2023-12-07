import clsx from 'clsx'
import type { Image } from 'svg-gobbler-scripts'
import { CardProps } from '.'

export const CardContent = ({ data }: Pick<CardProps, 'data'>) => {
  if (data.corsRestricted) {
    return (
      <img
        src={(data as Image).absoluteImageUrl}
        className="absolute bottom-0 top-0 m-auto w-full"
      />
    )
  }

  return (
    <span
      dangerouslySetInnerHTML={{ __html: data.presentationSvg }}
      className={clsx(
        '[& > svg]:absolute [& > svg]:inset-0 [& > svg]:inline-block relative inline-block w-full overflow-hidden pb-[100%] align-top',
      )}
    />
  )
}
