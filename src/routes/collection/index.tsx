import React from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { Svg } from 'scripts/svg-factory/svg'
import { EmptyState } from 'src/components'
import { SkeletonCollection } from 'src/components/skeleton-collection'
import { Collection } from 'src/layout/collection'
import { CollectionData } from 'types'

/**
 * This is really collection data with a promise we await for the svg data.
 */
type LoaderData = CollectionData & {
  data: Promise<Svg[]>
}

export const CollectionRoute = () => {
  const { data, collectionId } = useLoaderData() as LoaderData

  return (
    <React.Suspense fallback={<SkeletonCollection />}>
      <Await resolve={data}>
        {(resolvedData: CollectionData['data']) => {
          if (resolvedData.length === 0) {
            return <EmptyState />
          }

          return <Collection data={resolvedData} collectionId={collectionId} />
        }}
      </Await>
    </React.Suspense>
  )
}
