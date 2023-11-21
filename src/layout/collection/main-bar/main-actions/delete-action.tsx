import { Button } from 'src/components'
import { useMainActions } from './use-main-actions'

export const DeleteAction = () => {
  const { deleteSelectedItems } = useMainActions()

  return (
    <Button variant="ghost" size="xs" onClick={deleteSelectedItems}>
      Delete
    </Button>
  )
}
