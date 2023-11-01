import React from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { EmptyState } from 'src/components'
import { SkeletonCollection } from 'src/components/skeleton-collection'

export const Collection = () => {
  const data = useLoaderData() as Record<'collection', string>

  return (
    <React.Suspense fallback={<SkeletonCollection />}>
      <Await resolve={data.collection}>
        {(resolvedData) => {
          if (resolvedData.length === 0) {
            return <EmptyState />
          }

          return <div>Collection</div>
        }}
      </Await>
    </React.Suspense>
  )
}
