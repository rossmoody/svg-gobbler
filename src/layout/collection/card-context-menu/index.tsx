import {
  ArrowDownTrayIcon,
  ChevronRightIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import * as ContextMenu from '@radix-ui/react-context-menu'
import { Fragment, PropsWithChildren } from 'react'
import type { Svg } from 'scripts/svg-classes/svg'
import { useCollection } from 'src/providers'
import { ContextMenuItem } from './context-menu-item'
import { ContextMenuSubTrigger } from './context-menu-sub-trigger'

type Props = {
  data: Svg
}

export const CardContextMenu = ({ data, children }: PropsWithChildren<Props>) => {
  const { dispatch } = useCollection()

  const duplicateItem = async () => {
    dispatch({ type: 'duplicate-svg', payload: data })
    // const pageData = await StorageUtils.getPageData(state.collectionId)
    // StorageUtils.setPageData(state.collectionId, {
    //   ...pageData,
    //   data: SvgUtils.createStorageSvgs(state.data),
    // })
  }

  if (data.corsRestricted) {
    return <Fragment>{children}</Fragment>
  }

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="context-content">
          <Fragment>
            <ContextMenuItem onClick={duplicateItem}>
              <DocumentDuplicateIcon className="mr-1.5 h-3.5 w-3.5" />
              Duplicate
            </ContextMenuItem>
            <ContextMenuItem>
              <TrashIcon className="mr-1.5 h-3.5 w-3.5" />
              Delete
            </ContextMenuItem>
            <ContextMenu.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />
            <ContextMenu.Sub>
              <ContextMenuSubTrigger>
                <DocumentDuplicateIcon className="mr-1.5 h-3.5 w-3.5" />
                <span className="flex-grow">Copy to clipboard</span>
                <ChevronRightIcon className="h-3.5 w-3.5" />
              </ContextMenuSubTrigger>
              <ContextMenu.Portal>
                <ContextMenu.SubContent className="context-content origin-radix-context-menu">
                  <ContextMenuItem>Original</ContextMenuItem>
                  <ContextMenuItem>SVGO optimized</ContextMenuItem>
                  <ContextMenuItem>Default optimized</ContextMenuItem>
                </ContextMenu.SubContent>
              </ContextMenu.Portal>
            </ContextMenu.Sub>
            <ContextMenu.Sub>
              <ContextMenuSubTrigger>
                <ArrowDownTrayIcon className="mr-1.5 h-3.5 w-3.5" />
                <span className="flex-grow">Download</span>
                <ChevronRightIcon className="h-3.5 w-3.5" />
              </ContextMenuSubTrigger>
              <ContextMenu.Portal>
                <ContextMenu.SubContent className="context-content origin-radix-context-menu">
                  <ContextMenuItem>Original</ContextMenuItem>
                  <ContextMenuItem>SVGO optimized</ContextMenuItem>
                  <ContextMenuItem>Default optimized</ContextMenuItem>
                </ContextMenu.SubContent>
              </ContextMenu.Portal>
            </ContextMenu.Sub>
          </Fragment>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
