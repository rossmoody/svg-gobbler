import { HelpIcon } from 'src/components'
import { useMountEffect } from 'src/hooks'
import { useCollection, useDashboard, useExport } from 'src/providers'
import { loc } from 'src/utils/i18n'

export const Filename = () => {
  const { dispatch } = useExport()
  const { state: collectionState } = useCollection()
  const { dispatch: exportDispatch, state: exportState } = useExport()
  const { state: dashboardState } = useDashboard()

  useMountEffect(() => {
    const payload =
      dashboardState.collections.find((c) => c.id === collectionState.collectionId)?.name ??
      'svg-gobbler'
    dispatch({ payload, type: 'set-filename' })
  })

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    exportDispatch({ payload: e.target.value, type: 'set-filename' })
  }

  const handleFileNamePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    exportDispatch({ payload: e.target.value, type: 'set-filename-prefix' })
  }

  //// If there is only one selected item, render a single input for the file name
  if (collectionState.selected.length === 1) {
    return (
      <>
        <label className="export-label" htmlFor="file-name">
          {loc('export_filename')}
        </label>
        <input
          className="export-input"
          id="file-name"
          onChange={handleFileNameChange}
          type="text"
          value={exportState.filename}
        />
      </>
    )
  }

  return (
    <>
      <label className="export-label" htmlFor="file-name">
        {loc('export_export_filename')}
      </label>
      <input
        className="export-input"
        id="file-name"
        onChange={handleFileNameChange}
        type="text"
        value={exportState.filename}
      />
      <div className="group mt-3 flex items-center gap-1">
        <label className="export-label" htmlFor="prefix-file-name">
          {loc('export_filename_prefix')}
        </label>
        <HelpIcon content={loc('export_prefix_tooltip')} />
      </div>
      <input
        className="export-input"
        id="prefix-file-name"
        onChange={handleFileNamePrefixChange}
        type="text"
        value={exportState.filenamePrefix}
      />
      <span className="text-muted text-xs">
        {exportState.filenamePrefix && exportState.filenamePrefix + '_1.' + exportState.fileType}
      </span>
    </>
  )
}
