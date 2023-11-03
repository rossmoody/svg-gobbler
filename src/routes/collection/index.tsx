import React from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { Svg } from 'scripts/svg-factory/svg'
import { EmptyState } from 'src/components'
import { SkeletonCollection } from 'src/components/skeleton-collection'
import { Collection } from 'src/layout/collection'

type LoaderData = {
  data: Promise<Svg[]>
}

export const CollectionRoute = () => {
  const { data } = useLoaderData() as LoaderData

  return (
    <React.Suspense fallback={<SkeletonCollection />}>
      <Await resolve={data}>
        {(resolvedData: Svg[]) => {
          if (resolvedData.length === 0) {
            return <EmptyState />
          }

          return <Collection data={resolvedData} />
        }}
      </Await>
    </React.Suspense>
  )
}
