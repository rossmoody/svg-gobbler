import { EditField } from 'src/layout/collection/main-panel/edit-panel'

export const editFields: EditField[] = [
  {
    label: 'ID',
    tooltip:
      'The string to apply to the id property on the selected SVGs. Will replace the existing id',
    value: 'id',
  },
  {
    label: 'Height',
    tooltip:
      'The string to apply to the height property on the selected SVGs. Will replace the existing height',
    value: 'height',
  },
  {
    label: 'Width',
    tooltip:
      'The string to apply to the width property on the selected SVGs. Will replace the existing width value',
    value: 'width',
  },
  {
    label: 'Class',
    tooltip:
      'The string to apply to the class property on the selected SVGs. Will replace the existing class value',
    value: 'class',
  },
  {
    label: 'viewBox',
    tooltip:
      'The string to apply to the viewBox property on the selected SVGs. Will replace the existing viewBox value',
    value: 'viewBox',
  },
  {
    label: 'Fill',
    tooltip:
      'The string to apply to the fill property on the selected SVGs. Will replace the existing fill value',
    value: 'fill',
  },
]
