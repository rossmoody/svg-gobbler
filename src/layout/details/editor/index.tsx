export const DetailsEditor = () => {
  // const { state, dispatch } = useDetails()

  // const onChange = useCallback(
  //   (val: string) => {
  //     dispatch({ type: 'update-current-string', payload: val })
  //   },
  //   [dispatch],
  // )

  return (
    <section className="relative flex-grow">
      <div className="absolute inset-y-0 left-0 z-50 w-[1px] cursor-ew-resize hover:bg-red-100" />
      <div className="absolute inset-y-1/2 left-1 z-50 h-12 w-1 rounded bg-gray-500/40" />
      Editor
      <div className="absolute inset-y-1/2 right-1 z-50 h-12 w-1 rounded bg-gray-500/50" />
      <div className="absolute inset-y-0 right-0 z-50 w-[1px] cursor-ew-resize hover:bg-red-100" />
    </section>
  )
}
