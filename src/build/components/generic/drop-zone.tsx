import React, { ReactNode, SetStateAction, Dispatch } from 'react'
import { Box } from '@chakra-ui/react'

import { AppData } from '../../types'
import { util } from '../utils/upload'

interface DropZone {
  children: ReactNode
  setData: Dispatch<SetStateAction<AppData>>
}

const DropZone = ({ children, setData }: DropZone) => (
  <Box
    onDragOver={util.handleDragOver}
    onDragLeave={util.handleDragOut}
    onDrop={(event) => {
      util
        .handleDrop(event)
        .then((result) => {
          setData((prevData) => {
            if (prevData instanceof Array) {
              const newArray = [...prevData]
              newArray[0].unshift(...result)
              return newArray
            } else {
              return [result]
            }
          })
        })
        .catch(() => {})
    }}
  >
    {children}
  </Box>
)

export default DropZone
