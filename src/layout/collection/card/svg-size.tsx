import { useCollection } from 'src/providers'

import { CardData } from '.'

export const SvgSize = ({ data }: CardData) => {
  const {
    state: {
      view: { filters },
    },
  } = useCollection()

  if (data.corsRestricted) {
    return null
  }

  if (filters['show-size']) {
    return (
      <span className="absolute top-2 w-full text-center text-xs text-gray-500">
        {data.fileSize}
      </span>
    )
  }

  return (
    <span className="absolute top-4 w-full text-center text-xs text-gray-500 opacity-0 transition-all duration-300 ease-in-out group-hover/card:opacity-100">
      {data.fileSize}
    </span>
  )
}
