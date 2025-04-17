import { EditField } from 'src/layout/collection/main-panel/edit-panel'
import { loc } from 'src/utilities/i18n'

export const editFields: EditField[] = [
  {
    label: loc('edit_id'),
    tooltip: loc('edit_id_tooltip'),
    value: 'id',
  },
  {
    label: loc('edit_height'),
    tooltip: loc('edit_height_tooltip'),
    value: 'height',
  },
  {
    label: loc('edit_width'),
    tooltip: loc('edit_width_tooltip'),
    value: 'width',
  },
  {
    label: loc('edit_class'),
    tooltip: loc('edit_class_tooltip'),
    value: 'class',
  },
  {
    label: loc('edit_viewbox'),
    tooltip: loc('edit_viewbox_tooltip'),
    value: 'viewBox',
  },
  {
    label: loc('edit_fill'),
    tooltip: loc('edit_fill_tooltip'),
    value: 'fill',
  },
]
