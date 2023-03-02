import { Button, Center, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import SVG from '../../../find/SVG'
import Card from '../card'
import loc from '../utils/localization'
import { GalleryFrame } from './gallery-frame'

interface GalleryData {
  data: SVG[][]
}

const DataGallery = ({ data }: GalleryData) => {
  const [page, setPage] = React.useState(0)
  const [displayData, setDisplayData] = React.useState(data[0])
  const [loading, setLoading] = React.useState(false)

  const pageQuantity = data.length
  const morePagesToShow = page < pageQuantity - 1

  const handleShowMore = () => {
    const nextPage = page + 1
    setDisplayData((prevDisplayData) => {
      const newData = prevDisplayData
      newData.push(...data[nextPage])
      return newData
    })
    setPage(nextPage)
  }

  return (
    <GalleryFrame>
      <SimpleGrid minChildWidth="240px" spacing="24px" mb={4}>
        {displayData.map((svg) => (
          <Card key={svg.id} data={svg} />
        ))}
      </SimpleGrid>

      {morePagesToShow && (
        <Center padding={12}>
          <Button
            colorScheme="red"
            onClick={() => {
              setLoading(true)
              setTimeout(handleShowMore, 1)
              setTimeout(setLoading, 5000, false)
            }}
            loadingText={loc('gallery_load')}
            isLoading={loading}
          >
            {loc('gallery_show')}
          </Button>
        </Center>
      )}
    </GalleryFrame>
  )
}

export default DataGallery
