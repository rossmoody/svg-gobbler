import { useDetails } from 'src/providers'

export const PreviewSvg = () => {
  const { state } = useDetails()

  return (
    <div className="relative h-full overflow-hidden">
      <div
        className="flex h-full items-center justify-center p-8"
        dangerouslySetInnerHTML={{ __html: state.currentString }}
      />
      <div className="absolute bottom-4 left-4 right-4 flex justify-end">
        <div className="flex gap-3">
          <div className="h-4 w-4 rounded-full bg-slate-200" />
          <div className="h-4 w-4 rounded-full bg-slate-500" />
          <div className="h-4 w-4 rounded-full bg-slate-800" />
          <div className="h-4 w-4 rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  )
}
