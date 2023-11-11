import { useMemo } from 'react'
import { useCollection } from 'src/providers'

export const Pagination = () => {
  const { state } = useCollection()

  const filteredResultLength = useMemo(() => {
    if (state.view.filters['hide-cors']) {
      return state.data.filter((svg) => !svg.corsRestricted).length
    }

    return state.data.length
  }, [state.data, state.view.filters])

  return (
    <div className="hidden md:block leading-none">
      Showing <span className="font-medium">{state.processedData.length}</span> of{' '}
      <span className="font-medium">{filteredResultLength}</span> results
    </div>
  )
}
