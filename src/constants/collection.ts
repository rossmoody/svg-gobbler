import { nanoid } from 'nanoid'
import { loc } from 'src/utilities/i18n'
import { Collection } from 'types'

export const initCollection: Collection = {
  href: '',
  id: nanoid(),
  name: loc('sidebar_new_collection'),
  origin: '',
}
