import type { Svg } from 'src/scripts'
import type { CollectionData } from 'src/types'

import React, { Fragment, useEffect } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { EmptyState } from 'src/components'
import { SvgoPlugin } from 'src/constants/svgo-plugins'
import { usePastedSvg } from 'src/hooks'
import { Collection } from 'src/layout/collection'
import { Mainbar } from 'src/layout/collection/main-bar'
import { MainPanel } from 'src/layout/collection/main-panel'
import { SkeletonCollection } from 'src/layout/collection/skeleton-collection'
import { TopBar } from 'src/layout/top-bar'
import { useCollection, useExport, UserState, useUser } from 'src/providers'

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

  /**
   * Global listeners
   */
  usePastedSvg()

  useEffect(() => {
    collectionDispatch({ payload: collectionId, type: 'set-collection-id' })
    collectionDispatch({ payload: view, type: 'set-view' })
    exportDispatch({ payload: plugins, type: 'set-svgo-plugins' })
    userDispatch({ payload: user, type: 'set-user' })
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
        <MainPanel />
      </div>
    </Fragment>
  )
}
