import React, { Fragment } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { Svg } from 'scripts/svg-factory/svg'
import { EmptyState } from 'src/components'
import { Collection } from 'src/layout/collection'
import { SkeletonCollection } from 'src/layout/collection/skeleton-collection'
import { Mainbar } from 'src/layout/main-bar'
import { Mainpanel } from 'src/layout/main-panel'
import { TopBar } from 'src/layout/top-bar'
import type { CollectionData } from 'types'

/**
 * This is really collection data with a promise we await for the svg data.
 */
type LoaderData = CollectionData & {
  data: Promise<Svg[]>
}

export const CollectionRoute = () => {
  const { data, collectionId } = useLoaderData() as LoaderData

  return (
    <Fragment>
      <TopBar />
      <div className="flex">
        <main className="flex-1">
          <Mainbar />
          <div className="py-10 px-4 sm:px-6 lg:px-8 overflow-y-auto h-[calc(100dvh-theme(space.28))] bg-gray-100 dark:bg-gray-900 texts">
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
          </div>
        </main>
        <Mainpanel />
      </div>
    </Fragment>
  )
}
