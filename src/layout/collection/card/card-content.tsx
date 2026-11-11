import type { Image } from 'src/scripts'

import clsx from 'clsx'
import { ShadowSvg } from 'src/components/shadow-svg'

import { type CardData } from '.'

export const CardContent = ({ data }: CardData) => {
  if (data.corsRestricted) {
    return (
      <img
        className="absolute bottom-0 top-0 m-auto w-full"
        src={(data as Image).absoluteImageUrl}
      />
    )
  }

  return (
    <ShadowSvg
      className={clsx(
        '[& > svg]:absolute [& > svg]:inset-0 [& > svg]:inline-block relative inline-block w-full overflow-hidden pb-[100%] align-top',
      )}
      markup={data.presentationSvg}
    />
  )
}
