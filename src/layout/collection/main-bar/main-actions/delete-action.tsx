import { Button } from 'src/components'
import { useCollectionActions } from 'src/hooks'

export const DeleteAction = () => {
  const { deleteSelectedItems } = useCollectionActions()

  return (
    <Button variant="ghost" size="xs" onClick={deleteSelectedItems}>
      Delete
    </Button>
  )
}
