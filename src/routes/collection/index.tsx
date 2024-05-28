import type { CollectionData } from 'src/types'
import type { Svg } from 'svg-gobbler-scripts'

import React, { Fragment, useEffect } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { EmptyState } from 'src/components'
import { SvgoPlugin } from 'src/constants/svgo-plugins'
import { Collection } from 'src/layout/collection'
import { ExportPanel } from 'src/layout/collection/export-panel'
import { Mainbar } from 'src/layout/collection/main-bar'
import { SkeletonCollection } from 'src/layout/collection/skeleton-collection'
import { TopBar } from 'src/layout/top-bar'
import { UserState, useCollection, useExport, useUser } from 'src/providers'
import { logger } from 'src/utils/logger'

/**
 * This is really collection data with a promise we await for the svg data.
 */
type LoaderData = CollectionData & {
  data: Promise<Svg[]>
  plugins: SvgoPlugin[]
  user: UserState
}

export const CollectionRoute = () => {
  const { collectionId, data, plugins, user, view } = useLoaderData() as LoaderData
  const { dispatch: collectionDispatch } = useCollection()
  const { dispatch: exportDispatch } = useExport()
  const { dispatch: userDispatch } = useUser()

  useEffect(() => {
    collectionDispatch({ payload: collectionId, type: 'set-collection-id' })
    collectionDispatch({ payload: view, type: 'set-view' })
    exportDispatch({ payload: plugins, type: 'set-svgo-plugins' })
    userDispatch({ payload: user, type: 'set-user' })
    logger.info('Collection Context', { collectionId, plugins, user, view })

    return () => collectionDispatch({ type: 'reset' })
  }, [collectionId, collectionDispatch, view, exportDispatch, plugins, user, userDispatch])

  return (
    <Fragment>
      <TopBar />
      <div className="flex">
        <main className="flex-1">
          <Mainbar />
          <div className="text h-[calc(100dvh-theme(space.28))] overflow-y-auto bg-gray-100 p-6 transition-all duration-300 dark:bg-gray-900">
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
