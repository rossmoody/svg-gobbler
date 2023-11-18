import { forwardRef, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useDetails } from 'src/providers/details'
import { DetailsEditor } from './editor'
import { useOptimize } from './editor/use-optimize'
import { ExportSidebar } from './export-sidebar'
import { Header } from './header'
import { PreviewSidebar } from './preview-sidebar'

export const DetailsLayout = forwardRef<HTMLDivElement>((_, ref) => {
  const svg = useLoaderData() as string
  const { optimize } = useOptimize()
  const { dispatch } = useDetails()

  useEffect(() => {
    dispatch({ type: 'init', payload: svg })
    dispatch({ type: 'update-current-string', payload: optimize(svg) })
  }, [])

  return (
    <div ref={ref} className="h-full">
      <Header />
      <main className="relative flex h-[calc(100dvh-theme(space.14))]">
        <ExportSidebar />
        <DetailsEditor />
        <PreviewSidebar />
      </main>
    </div>
  )
})
