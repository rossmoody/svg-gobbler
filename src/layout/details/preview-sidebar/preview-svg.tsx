import { useDetails } from 'src/providers'

export const PreviewSvg = () => {
  const { state } = useDetails()

  return (
    <div className="flex h-full items-center justify-center">
      <div dangerouslySetInnerHTML={{ __html: state.currentString }} />
    </div>
  )
}
