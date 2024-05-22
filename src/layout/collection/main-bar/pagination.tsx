import { useMemo } from 'react'
import { useCollection } from 'src/providers'
import { loc } from 'src/utils/i18n'

export const Pagination = () => {
  const { state } = useCollection()

  const filteredResultLength = useMemo(() => {
    if (state.view.filters['hide-cors']) {
      return state.data.filter((svg) => !svg.corsRestricted).length
    }

    return state.data.length
  }, [state.data, state.view.filters])

  return (
    <div className="hidden leading-none md:block">
      {loc('main_showing')} <span className="font-medium">{state.processedData.length}</span>{' '}
      {loc('main_of')} <span className="font-medium">{filteredResultLength}</span>{' '}
      {loc('main_results')}
    </div>
  )
}
