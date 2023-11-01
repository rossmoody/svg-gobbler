import React from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { SkeletonCollection } from 'src/components/skeleton-collection'

export const Collection = () => {
  const data = useLoaderData() as Record<'foo', string>

  return (
    <React.Suspense fallback={<SkeletonCollection />}>
      <Await resolve={data.foo}>
        {(resolvedData) => {
          if (resolvedData.length === 0) {
            return <SkeletonCollection />
          }

          return <div>Collection</div>
        }}
      </Await>
    </React.Suspense>
  )
}
