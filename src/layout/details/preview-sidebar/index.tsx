import { Tabs } from 'src/components'
import { DataURI } from './preview-data-uri'
import { PreviewReact } from './preview-react'
import { PreviewSvg } from './preview-svg'
import { usePreviewResize } from './use-preview-resize'

export const PreviewSidebar = () => {
  const { ref, width } = usePreviewResize()

  return (
    <aside ref={ref} style={{ width }} className="relative z-10 flex flex-col">
      <Tabs.Group>
        <Tabs.List className="shrink-0 overflow-x-auto whitespace-nowrap">
          <Tabs.Tab>Preview</Tabs.Tab>
          <Tabs.Tab>React</Tabs.Tab>
          <Tabs.Tab>Data URI</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels className="flex-grow overflow-auto">
          <Tabs.Panel className="h-full">
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
      <div className="absolute inset-y-0 left-0 z-50 w-[1px] cursor-ew-resize hover:bg-gray-200" />
      <div className="absolute inset-y-1/2 -left-2 z-50 h-12 w-1 cursor-ew-resize rounded bg-gray-500/50" />
    </aside>
  )
}
