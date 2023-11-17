import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { forwardRef, useEffect } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { IconButton } from 'src/components'
import { useDetails } from 'src/providers/details'
import { ExportSidebar } from './export-sidebar'
import { PreviewSidebar } from './preview-sidebar'

export const DetailsLayout = forwardRef<HTMLDivElement>((_, ref) => {
  const svg = useLoaderData() as string
  const { state, dispatch } = useDetails()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: 'init', payload: svg })
  }, [svg, dispatch])

  const navigateBack = () => {
    navigate(-1)
  }

  return (
    <div ref={ref} className="h-full">
      <header className="flex h-14 items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
        <nav className="flex items-center gap-3">
          <IconButton onClick={navigateBack} size="sm" variant="secondary">
            <ArrowLeftIcon className="h-5 w-5" />
          </IconButton>
          <h1 className="text-lg font-semibold">Edit SVG</h1>
        </nav>
      </header>
      <main className="relative flex h-[calc(100dvh-theme(space.14))] ">
        <ExportSidebar />
        <section className="flex-grow">{state.originalString}</section>
        <PreviewSidebar />
      </main>
    </div>
  )
})
