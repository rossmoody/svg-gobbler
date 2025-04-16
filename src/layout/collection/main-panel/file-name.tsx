import { HelpIcon } from 'src/components'
import { useMountEffect } from 'src/hooks'
import { useCollection, useDashboard, useExport } from 'src/providers'
import { loc } from 'src/utilities/i18n'

export const Filename = () => {
  const { dispatch } = useExport()
  const { state: collectionState } = useCollection()
  const { dispatch: exportDispatch, state: exportState } = useExport()
  const { state: dashboardState } = useDashboard()

  useMountEffect(() => {
    let payload = collectionState.selected[0].name

    if (collectionState.selected.length > 1) {
      payload =
        dashboardState.collections.find((c) => c.id === collectionState.collectionId)?.name ??
        'svg-gobbler'
    }

    dispatch({ payload, type: 'set-filename' })
  })

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    exportDispatch({ payload: event.target.value, type: 'set-filename' })
  }

  const handleFileNamePrefixChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    exportDispatch({ payload: event.target.value, type: 'set-filename-prefix' })
  }

  const handlePrefixFilenamesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    exportDispatch({ payload: event.target.checked, type: 'set-prefix-filenames' })
  }

  //// If there is only one selected item, render a single input for the file name
  if (collectionState.selected.length === 1 || exportState.fileType === 'sprite') {
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
      <div className="group mt-4 flex items-center gap-2">
        <input
          checked={exportState.prefixFilenames}
          className="checkbox"
          id="prefix-files"
          onChange={handlePrefixFilenamesChange}
          type="checkbox"
        />
        <span className="flex gap-1">
          <label className="export-label" htmlFor="prefix-files">
            {loc('export_prefix_names')}
          </label>
          <HelpIcon content={loc('export_prefix_names_tooltip')} />
        </span>
      </div>
      {exportState.prefixFilenames && (
        <div className="mt-2 flex flex-col">
          <input
            className="export-input"
            id="prefix-file-name"
            onChange={handleFileNamePrefixChange}
            type="text"
            value={exportState.filenamePrefix}
          />
          <span className="text-muted text-xs">
            {exportState.filenamePrefix &&
              exportState.filenamePrefix + '_1.' + exportState.fileType}
          </span>
        </div>
      )}
    </>
  )
}
