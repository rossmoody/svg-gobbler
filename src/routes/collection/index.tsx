import React, { Fragment, useEffect } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { Svg } from 'scripts/svg-classes/svg'
import { EmptyState } from 'src/components'
import { SvgoPlugin } from 'src/data/svgo-plugins'
import { Collection } from 'src/layout/collection'
import { SkeletonCollection } from 'src/layout/collection/skeleton-collection'
import { ExportPanel } from 'src/layout/export-panel'
import { Mainbar } from 'src/layout/main-bar'
import { TopBar } from 'src/layout/top-bar'
import { useCollection, useExport } from 'src/providers'
import type { CollectionData } from 'src/types'

/**
 * This is really collection data with a promise we await for the svg data.
 */
type LoaderData = CollectionData & {
  plugins: SvgoPlugin[]
  data: Promise<Svg[]>
}

export const CollectionRoute = () => {
  const { data, collectionId, view, plugins } = useLoaderData() as LoaderData
  const { dispatch: collectionDispatch } = useCollection()
  const { dispatch: exportDispatch } = useExport()

  useEffect(() => {
    collectionDispatch({ type: 'set-collection-id', payload: collectionId })
    collectionDispatch({ type: 'set-view', payload: view })
    exportDispatch({ type: 'set-svgo-plugins', payload: plugins })

    return () => collectionDispatch({ type: 'reset' })
  }, [collectionId, collectionDispatch, view, exportDispatch, plugins])

  return (
    <Fragment>
      <TopBar />
      <div className="flex">
        <main className="flex-1">
          <Mainbar />
          <div
            className="text h-[calc(100dvh-theme(space.28))] overflow-y-auto 
                      bg-gray-100 p-6 transition-all duration-300 dark:bg-gray-900"
          >
            <React.Suspense fallback={<SkeletonCollection />}>
              <Await resolve={data}>
                {(resolvedData: CollectionData['data']) => {
                  if (resolvedData.length === 0) {
                    return <EmptyState />
                  }
                  return <Collection data={resolvedData} />
                }}
              </Await>
            </React.Suspense>
          </div>
        </main>
        <ExportPanel />
      </div>
    </Fragment>
  )
}
