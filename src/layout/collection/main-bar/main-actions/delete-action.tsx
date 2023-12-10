import { Button } from 'src/components'

import { useMainActions } from './use-main-actions'

export const DeleteAction = () => {
  const { deleteSelectedItems } = useMainActions()

  return (
    <Button onClick={deleteSelectedItems} size="xs" variant="ghost">
      Delete
    </Button>
  )
}
