import { Image } from 'scripts/svg-classes/image'
import { CardProps } from '.'

/**
 * Conditionally renders a cors protected image element or the original svg string as html.
 */
export const CardContent = ({ data }: Pick<CardProps, 'data'>) => {
  if (data.corsRestricted) {
    return (
      <img
        src={(data as Image).absoluteImageUrl}
        className="w-full absolute top-0 bottom-0 m-auto"
      />
    )
  }

  return (
    <span
      dangerouslySetInnerHTML={{ __html: data.presentationSvg }}
      className="[& > svg]:absolute [& > svg]:inset-0 [& > svg]:overflow-visible"
    />
  )
}
