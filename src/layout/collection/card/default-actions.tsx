import { Fragment, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { useCollection } from 'src/providers'

import { type CardData } from '.'
import { CardActionMenu } from './card-actions/action-menu'
import { CardSelect } from './card-actions/card-select'

/**
 * The functionality of a given card when it is not cors restricted.
 */
export const DefaultActions = ({ children, data }: PropsWithChildren<CardData>) => {
  const { state } = useCollection()

  return (
    <Fragment>
      <CardActionMenu data={data} />
      <CardSelect data={data} />
      <Link
        className="flex h-full w-full items-center justify-center"
        to={`/details/${state.collectionId}/${data.id}`}
      >
        {children}
      </Link>
    </Fragment>
  )
}
