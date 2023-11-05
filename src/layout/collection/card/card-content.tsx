import { CardProps } from '.'

/**
 * Conditionally renders a cors protected image element or the original svg string as html.
 */
export const CardContent = ({ data }: CardProps) => {
  if (data.isCorsRestricted) {
    return <img src={data.corsRestrictedUrl} className="w-full" />
  }

  return (
    <span
      dangerouslySetInnerHTML={{ __html: data.presentationSvg }}
      className="[&>svg]:absolute [&>svg]:h-full [&>svg]:w-full [&>svg]:left-0 [&>svg]:top-0 [&>svg]:overflow-visible"
    />
  )
}