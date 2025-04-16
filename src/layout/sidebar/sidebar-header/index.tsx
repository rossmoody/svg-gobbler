import { PlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { loc } from 'src/utilities/i18n'

import { NewCollectionModal } from './new-collection-item'

export const SidebarHeader = () => {
  const [open, setOpen] = useState(false)

  return (
    <div aria-labelledby="collections-heading">
      <button className="collection-item w-full" onClick={() => setOpen(true)}>
        <PlusIcon aria-hidden="true" className="h-4 w-4" />
        {loc('sidebar_new_collection')}
      </button>
      <NewCollectionModal open={open} setOpen={setOpen} />
      <hr className="mb-5 mt-2 border-gray-200 dark:border-gray-800" />
    </div>
  )
}
