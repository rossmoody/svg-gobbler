import React from 'react'
import SVG from '../../../find/SVG'
import { useData } from '../../providers/data-provider'
import loc from '../utils/localization'
import DataGallery from './data-gallery'
import EmptyGallery from './empty-gallery'
import LoadingGallery from './loading-gallery'

const Gallery = () => {
  const { data } = useData()

  if (!data || data.length < 1) {
    return <LoadingGallery />
  }

  if (data === 'empty') {
    return (
      <EmptyGallery
        headline={loc('gallery_noAvailTitle')}
        description={loc('gallery_noAvailDesc')}
      />
    )
  }

  return <DataGallery data={data as SVG[][]} />
}

export default Gallery
