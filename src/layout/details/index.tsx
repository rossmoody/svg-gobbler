import type { DetailsParams } from 'src/types'

import { forwardRef, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useDetails } from 'src/providers/details'

import { DetailsEditor } from './editor'
import { ExportSidebar } from './export-sidebar'
import { Header } from './header'
import { PreviewSidebar } from './preview-sidebar'

export const DetailsLayout = forwardRef<HTMLDivElement>((_, ref) => {
  const data = useLoaderData() as DetailsParams
  const { dispatch } = useDetails()

  useEffect(() => {
    dispatch({ payload: data, type: 'init' })
  }, [dispatch, data])

  return (
    <div className="h-full overflow-hidden" ref={ref}>
      <Header />
      <main className="relative flex h-[calc(100dvh-theme(space.16))]">
        <ExportSidebar />
        <DetailsEditor />
        <PreviewSidebar />
      </main>
    </div>
  )
})
