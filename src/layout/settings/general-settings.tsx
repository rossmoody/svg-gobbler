import { useRevalidator } from 'react-router-dom'
import { Button } from 'src/components'
import { useExportData, useResetEnvironment } from 'src/hooks'
import { type UserState, useUser } from 'src/providers'
import { Collection } from 'src/types'
import { loc } from 'src/utils/i18n'
import { StorageUtils } from 'src/utils/storage-utils'

import { Category } from './category'
import { Item } from './item'
import { KeyboardShortcut } from './keyboard-shortcut'

export const GeneralSettings = () => {
  const { dispatch, state } = useUser()
  const { reset } = useResetEnvironment()
  const { exportAllDataAsJson, exportAllDataAsZip } = useExportData()
  const { revalidate } = useRevalidator()

  const handleOpenKeyboardShortcuts = () => {
    chrome.tabs.update({ url: 'chrome://extensions/shortcuts' })
  }

  const handleImportMerging = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userState: UserState = {
      ...state,
      settings: { ...state.settings, mergeCollections: e.target.checked },
    }

    dispatch({ payload: userState, type: 'set-user' })
    StorageUtils.setStorageData('user', userState)
  }

  const handleSortCollections = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const userState: UserState = {
      ...state,
      settings: { ...state.settings, sortCollections: e.target.checked },
    }

    dispatch({ payload: userState, type: 'set-user' })
    StorageUtils.setStorageData('user', userState)

    // Sort the collections alphabetically if the user opts in
    if (userState.settings.sortCollections) {
      const collections = await StorageUtils.getStorageData<Collection[]>('collections')
      if (collections) {
        collections.sort((a, b) => a.name.localeCompare(b.name))
        StorageUtils.setStorageData('collections', collections)
      }

      revalidate()
    }
  }

  return (
    <Category description={loc('settings_general_desc')} title={loc('settings_general')}>
      <Item>
        <Item.Section>
          <Item.Heading>{loc('settings_kbd')}</Item.Heading>
          <Item.Description>
            {loc('settings_kbd_desc')} <KeyboardShortcut />. {loc('settings_kbd_desc_2')},{' '}
            <span className="anchor" onClick={handleOpenKeyboardShortcuts}>
              {loc('settings_kbd_desc_3')}
            </span>
            .
          </Item.Description>
        </Item.Section>

        <Item.Section>
          <Item.Heading>{loc('settings_collections_title')}</Item.Heading>
          <Item.Description>{loc('settings_collections_desc')}</Item.Description>
          <Item.Setting>
            <div className="flex gap-2">
              <input
                checked={state.settings.sortCollections}
                className="checkbox"
                id="sort-collections"
                onChange={handleSortCollections}
                type="checkbox"
              />
              <div>
                <label
                  className="block pb-1 text-sm font-medium leading-4"
                  htmlFor="sort-collections"
                >
                  {loc('settings_sort_collections_label')}
                </label>
                <span className="text-muted">{loc('settings_sort_collections_desc')}</span>
              </div>
            </div>
          </Item.Setting>
          <Item.Setting>
            <div className="flex gap-2">
              <input
                checked={state.settings.mergeCollections}
                className="checkbox"
                id="import-merging"
                onChange={handleImportMerging}
                type="checkbox"
              />
              <div>
                <label
                  className="block pb-1 text-sm font-medium leading-4"
                  htmlFor="import-merging"
                >
                  {loc('settings_merge_label')}
                </label>
                <span className="text-muted">{loc('settings_merge_tooltip')}</span>
              </div>
            </div>
          </Item.Setting>
        </Item.Section>
        <hr className="my-6" />
        <Item.Section>
          <Item.Heading>{loc('settings_export_title')}</Item.Heading>
          <Item.Description>{loc('settings_export__desc')}</Item.Description>
          <Item.Setting>
            <label className="block pb-1 text-sm font-medium leading-4">
              {loc('settings_export_data')}
            </label>
            <span className="text-muted mb-3 block">{loc('settings_export_data_desc')}</span>
            <Button onClick={exportAllDataAsJson} size="md" variant="secondary">
              {loc('settings_export_data')}
            </Button>
          </Item.Setting>
          <Item.Setting>
            <label className="block pb-1 text-sm font-medium leading-4">
              {loc('settings_export_all_svg_title')}
            </label>
            <span className="text-muted mb-3 block">{loc('settings_export_all_svg_desc')}</span>
            <Button onClick={exportAllDataAsZip} size="md" variant="secondary">
              {loc('settings_export_all_svg_button')}
            </Button>
          </Item.Setting>
          <Item.Setting>
            <label className="block pb-1 text-sm font-medium leading-4">
              {loc('settings_reset_title')}
            </label>
            <span className="text-muted mb-3 block">{loc('settings_reset_desc')}</span>
            <Button onClick={reset} size="md" variant="destructive">
              {loc('settings_reset_action')}
            </Button>
          </Item.Setting>
        </Item.Section>
      </Item>
    </Category>
  )
}
