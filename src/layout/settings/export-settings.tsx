import _ from 'lodash'
import { useEffect, useState } from 'react'
import { SvgoPlugin, svgoPlugins } from 'src/constants/svgo-plugins'
import { StorageUtils } from 'src/utils/storage-utils'
import { Category } from './category'

export const ExportSettings = () => {
  const [storagePlugins, setStoragePlugins] = useState<SvgoPlugin[]>([])

  useEffect(() => {
    const fetchSvgoPlugins = async () => {
      const plugins = await StorageUtils.getStorageData<SvgoPlugin[]>('plugins')
      setStoragePlugins(plugins!)
    }

    fetchSvgoPlugins()
  }, [])

  const isChecked = (plugin: SvgoPlugin) => {
    return storagePlugins.some((p) => p.name === plugin.name)
  }

  const handleCheckboxChange =
    (plugin: SvgoPlugin) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target

      if (checked) {
        const plugins = [...storagePlugins, plugin]
        setStoragePlugins(plugins)
        StorageUtils.setStorageData('plugins', plugins)
      } else {
        const filteredPlugins = storagePlugins.filter((p) => p.name !== plugin.name)
        setStoragePlugins(filteredPlugins)
        StorageUtils.setStorageData('plugins', filteredPlugins)
      }
    }

  return (
    <Category title="Export" description="Configuration settings for the export panel.">
      <div className="sm:max-w-xl sm:grid-cols-6 md:col-span-2">
        <div className="mb-5">
          <h3 className="text-base font-semibold leading-7">SVGO Plugins</h3>
          <p className="text-muted mt-1 text-sm leading-6">
            The default SVGO plugin configuration that will be used when launching SVG Gobbler.
          </p>
        </div>
        {_.sortBy(svgoPlugins, 'name').map((plugin) => (
          <div key={plugin.name} className="mt-4 flex gap-2">
            <input
              id={plugin.name}
              type="checkbox"
              className="checkbox"
              checked={isChecked(plugin)}
              onChange={handleCheckboxChange(plugin)}
            />
            <div>
              <label htmlFor={plugin.name} className="block leading-4">
                {plugin.label}
              </label>
              <span className="text-muted">{plugin.description}</span>
            </div>
          </div>
        ))}
      </div>
    </Category>
  )
}
