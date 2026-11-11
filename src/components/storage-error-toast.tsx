import { useEffect, useState } from 'react'
import { loc } from 'src/utilities/i18n'
import { STORAGE_WRITE_ERROR_EVENT } from 'src/utilities/storage-utilities'

import { Toast } from './toast'

/**
 * Tells the user when a change could not be written to storage. Must be
 * rendered inside a Radix toast provider.
 */
export const StorageErrorToast = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const listener = () => setOpen(true)
    globalThis.addEventListener(STORAGE_WRITE_ERROR_EVENT, listener)
    return () => globalThis.removeEventListener(STORAGE_WRITE_ERROR_EVENT, listener)
  }, [])

  return (
    <Toast
      actionText={loc('review_secondary_action')}
      description={loc('storage_error_desc')}
      onAction={() => setOpen(false)}
      open={open}
      title={loc('storage_error_title')}
    />
  )
}
