import { Box } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { useData } from '../../providers/data-provider'
import DropZoneTarget from './drop-zone-target'

const DropZone: React.FC = ({ children }) => {
  const [dropzone, setDropzone] = useState(false)

  const dropzoneMemo = useMemo(() => dropzone, [dropzone])

  const { setData } = useData()

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    event.stopPropagation()
    setDropzone(true)
  }

  return (
    <>
      <Box onDragOver={handleDragOver}>{children}</Box>
      {dropzoneMemo && (
        <DropZoneTarget setDropzone={setDropzone} setData={setData} />
      )}
    </>
  )
}

export default DropZone
