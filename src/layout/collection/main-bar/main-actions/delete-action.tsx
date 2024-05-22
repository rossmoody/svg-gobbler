import { Button } from 'src/components'
import { loc } from 'src/utils/i18n'

import { useMainActions } from './use-main-actions'

export const DeleteAction = () => {
  const { deleteSelectedItems } = useMainActions()

  return (
    <Button onClick={deleteSelectedItems} size="xs" variant="ghost">
      {loc('main_delete')}
    </Button>
  )
}
