import { Suspense } from 'react'
import { Await, Navigate, useLoaderData } from 'react-router-dom'

/**
 * This is a lonely route that is used to initialize the app via chrome messages between client and background scripts.
 * It is immediately forwarded to /dashboard/collection to stop the subsequent attempts at message passing which
 * always fail because there is no listener on the client side.
 */
export const RootRoute = () => {
  const { collectionId } = useLoaderData() as { collectionId: Promise<string> }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={collectionId}>
        {(resolvedCollectionId: string) => {
          return <Navigate to={`/dashboard/collection/${resolvedCollectionId}`} />
        }}
      </Await>
    </Suspense>
  )
}
