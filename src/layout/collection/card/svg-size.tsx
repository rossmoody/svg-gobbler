import { CardData } from '.'

export const SvgSize = ({ data }: CardData) => {
  if (data.corsRestricted) {
    return null
  }

  return (
    <span className="absolute top-4 w-full text-center text-xs text-gray-500 opacity-0 transition-all duration-300 ease-in-out group-hover/card:opacity-100">
      {data.fileSize}
    </span>
  )
}
