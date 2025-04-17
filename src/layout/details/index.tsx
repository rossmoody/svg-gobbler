import type { DetailsParameters } from 'src/types'

import { forwardRef, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useUser } from 'src/providers'
import { useDetails } from 'src/providers/details'

import { DetailsEditor } from './editor'
import { ExportSidebar } from './export-sidebar'
import { Header } from './header'
import { PreviewSidebar } from './preview-sidebar'

export const DetailsLayout = forwardRef<HTMLDivElement>((_, reference) => {
  const data = useLoaderData() as DetailsParameters
  const { dispatch: detailsDispatch } = useDetails()
  const { dispatch: userDispatch } = useUser()

  useEffect(() => {
    detailsDispatch({ payload: data, type: 'init' })
    userDispatch({ payload: data.user, type: 'set-user' })
  }, [data, detailsDispatch, userDispatch])

  return (
    <div className="h-full overflow-hidden" ref={reference}>
      <Header />
      <main className="relative flex h-[calc(100dvh-theme(space.16))]">
        <ExportSidebar />
        <DetailsEditor />
        <PreviewSidebar />
      </main>
    </div>
  )
})
