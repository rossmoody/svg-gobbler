import { Tabs } from 'src/components'
import { useResize } from 'src/hooks'
import { DataURI } from './data-uri'
import { PreviewSvg } from './preview-svg'

export const PreviewSidebar = () => {
  const { ref, width } = useResize(400)

  return (
    <aside ref={ref} style={{ width }} className="relative z-10 overflow-hidden">
      <div className="h-full pt-2">
        <Tabs.Group>
          <Tabs.List className="overflow-x-auto whitespace-nowrap">
            <Tabs.Tab>Preview</Tabs.Tab>
            <Tabs.Tab>React</Tabs.Tab>
            <Tabs.Tab>Data URI</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels className="h-full">
            <Tabs.Panel className="h-full">
              <PreviewSvg />
            </Tabs.Panel>
            <Tabs.Panel className="h-full">React</Tabs.Panel>
            <Tabs.Panel className="h-full">
              <DataURI />
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs.Group>
      </div>
      <div className="absolute inset-y-1/2 -left-2 z-50 h-12 w-1 cursor-ew-resize rounded bg-gray-500/30" />
      <div className="absolute inset-y-0 left-0 z-50 w-[1px] cursor-ew-resize hover:bg-gray-500" />
    </aside>
  )
}
