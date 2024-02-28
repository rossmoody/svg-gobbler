import { HelpIcon } from 'src/components'
import { useCollection, useExport } from 'src/providers'

export const Filename = () => {
  const { state: collectionState } = useCollection()
  const { dispatch: exportDispatch, state: exportState } = useExport()

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
          File name
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
        Export file name
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
          File name prefix
        </label>
        <HelpIcon content="The prefix that will be added to the beginning of each file name." />
      </div>
      <input
        className="export-input"
        id="prefix-file-name"
        onChange={handleFileNamePrefixChange}
        type="text"
        value={exportState.filenamePrefix}
      />
      <span className="text-muted text-xs">
        {exportState.filenamePrefix && exportState.filenamePrefix + '_1.svg'}
      </span>
    </>
  )
}
