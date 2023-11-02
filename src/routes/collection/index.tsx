import React from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { Svg } from 'scripts/svg-factory/svg'
import { EmptyState } from 'src/components'
import { SkeletonCollection } from 'src/components/skeleton-collection'

type LoaderData = {
  data: Promise<Svg[]>
}

export const Collection = () => {
  const { data } = useLoaderData() as LoaderData

  return (
    <React.Suspense fallback={<SkeletonCollection />}>
      <Await resolve={data}>
        {(resolvedData: Svg[]) => {
          if (resolvedData.length === 0) {
            return <EmptyState />
          }

          return (
            <ul className="list-disc break-all">
              {resolvedData.map((svg, i) => (
                <li key={svg.originalString + i}>{svg.originalString}</li>
              ))}
            </ul>
          )
        }}
      </Await>
    </React.Suspense>
  )
}
