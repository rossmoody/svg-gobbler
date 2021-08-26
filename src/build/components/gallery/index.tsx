import React from 'react'

import { AppData } from '../../types'
import loc from '../utils/localization'

import LoadingGallery from './loading-gallery'
import DataGallery from './data-gallery'
import EmptyGallery from './empty-gallery'

interface GalleryData {
  data: AppData
}

const Gallery = ({ data }: GalleryData) => {
  switch (data) {
    case undefined: {
      return <LoadingGallery />
    }

    case 'empty': {
      return (
        <EmptyGallery
          headline={loc('gallery_noAvailTitle')}
          description={loc('gallery_noAvailDesc')}
        />
      )
    }

    case 'system': {
      return (
        <EmptyGallery
          headline={loc('gallery_uploadTitle')}
          description={loc('gallery_uploadDesc')}
        />
      )
    }

    case 'error': {
      return (
        <EmptyGallery
          headline={loc('gallery_errorTitle')}
          description={loc('gallery_errorDesc')}
        />
      )
    }

    default: {
      return <DataGallery data={data} />
    }
  }
}

export default Gallery
