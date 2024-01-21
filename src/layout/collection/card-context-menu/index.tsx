import type { Svg } from 'svg-gobbler-scripts'

import {
  ArrowDownTrayIcon,
  ChevronRightIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import * as ContextMenu from '@radix-ui/react-context-menu'
import { Fragment, PropsWithChildren } from 'react'

import { ContextMenuItem } from './context-menu-item'
import { ContextMenuSubTrigger } from './context-menu-sub-trigger'
import { useContextActions } from './use-context-actions'

type Props = {
  data: Svg
}

export const CardContextMenu = ({ children, data }: PropsWithChildren<Props>) => {
  const actions = useContextActions(data)

  if (data.corsRestricted) {
    return <Fragment>{children}</Fragment>
  }

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="context-content">
          <Fragment>
            <ContextMenu.Sub>
              <ContextMenuSubTrigger>
                <DocumentDuplicateIcon className="mr-1.5 h-3.5 w-3.5" />
                <span className="flex-grow">Copy to clipboard</span>
                <ChevronRightIcon className="ml-2 h-3.5 w-3.5" />
              </ContextMenuSubTrigger>
              <ContextMenu.Portal>
                <ContextMenu.SubContent className="context-content origin-radix-context-menu">
                  <ContextMenuItem onClick={actions.copyOriginal}>Original</ContextMenuItem>
                  <ContextMenuItem onClick={actions.copySvgoConfig}>Optimized</ContextMenuItem>
                </ContextMenu.SubContent>
              </ContextMenu.Portal>
            </ContextMenu.Sub>
            <ContextMenu.Sub>
              <ContextMenuSubTrigger>
                <ArrowDownTrayIcon className="mr-1.5 h-3.5 w-3.5" />
                <span className="flex-grow">Download</span>
                <ChevronRightIcon className="ml-2 h-3.5 w-3.5" />
              </ContextMenuSubTrigger>
              <ContextMenu.Portal>
                <ContextMenu.SubContent className="context-content origin-radix-context-menu">
                  <ContextMenuItem onClick={actions.downloadOriginal}>Original</ContextMenuItem>
                  <ContextMenuItem onClick={actions.downloadSvgoConfig}>Optimized</ContextMenuItem>
                </ContextMenu.SubContent>
              </ContextMenu.Portal>
            </ContextMenu.Sub>
            <ContextMenu.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />
            <ContextMenuItem onClick={actions.duplicateItem}>
              <DocumentDuplicateIcon className="mr-1.5 h-3.5 w-3.5" />
              Duplicate
            </ContextMenuItem>
            <ContextMenuItem onClick={actions.deleteItem}>
              <TrashIcon className="mr-1.5 h-3.5 w-3.5" />
              Delete
            </ContextMenuItem>
          </Fragment>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
