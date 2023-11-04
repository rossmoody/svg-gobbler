import { useEffect } from 'react'
import { useMain } from 'src/providers'
import type { CollectionData } from 'types'
import { Mainbar } from '../main-bar'
import { Mainpanel } from '../main-panel'
import { TopBar } from '../top-bar'

export const Collection = ({ data, collectionId }: CollectionData) => {
  const { state, dispatch } = useMain()

  useEffect(() => {
    dispatch({ type: 'set-data', payload: data })
    dispatch({ type: 'set-collection-id', payload: collectionId })
  }, [data, collectionId, dispatch])

  return (
    <div className="lg:pl-72 transition-all relative overflow-hidden bg-white dark:bg-gray-900">
      <TopBar />
      <div className="flex">
        <main className="flex-1">
          <Mainbar />
          <section className="py-10 px-4 sm:px-6 lg:px-8 overflow-y-auto h-[calc(100dvh-theme(space.28))] transition-colors bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50 border-gray-200 dark:border-gray-800">
            <ul className="list-disc break-all">
              {state.data.map((svg, i) => (
                <li key={svg.originalString + i}>{svg.originalString}</li>
              ))}
            </ul>
          </section>
        </main>
        <Mainpanel />
      </div>
    </div>
  )
}
