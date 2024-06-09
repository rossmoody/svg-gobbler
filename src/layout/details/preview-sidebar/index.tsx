import { Tabs } from 'src/components'
import { loc } from 'src/utils/i18n'

import { DataURI } from './preview-data-uri'
import { PreviewReact } from './preview-react'
import { PreviewSvg } from './preview-svg'
import { usePreviewResize } from './use-preview-resize'

export const PreviewSidebar = () => {
  const { ref, width } = usePreviewResize()

  return (
    <aside className="relative z-10 flex h-full flex-col" ref={ref} style={{ width }}>
      <Tabs.Group>
        <Tabs.List className="whitespace-nowrap">
          <Tabs.Tab>{loc('details_preview')}</Tabs.Tab>
          <Tabs.Tab>{loc('details_react')}</Tabs.Tab>
          <Tabs.Tab>{loc('details_data_uri')}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels className="flex-grow overflow-auto">
          <Tabs.Panel className="flex h-full flex-col">
            <PreviewSvg />
          </Tabs.Panel>
          <Tabs.Panel className="h-full">
            <PreviewReact />
          </Tabs.Panel>
          <Tabs.Panel>
            <DataURI />
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs.Group>
      <div className="absolute inset-y-0 left-0 z-50 w-px cursor-ew-resize" />
      <div className="absolute inset-y-1/2 -left-2 z-50 h-12 w-1 cursor-ew-resize rounded bg-gray-500/50" />
    </aside>
  )
}
