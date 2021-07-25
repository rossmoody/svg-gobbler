import React from 'react'

import { AppData } from '../../types'

import LoadingGallery from './loading-gallery'
import EmptyGallery from './empty-gallery'
import DataGallery from './data-gallery'

interface GalleryData {
  data: AppData
  setData: React.Dispatch<React.SetStateAction<AppData>>
}

const Gallery = ({ data, setData }: GalleryData) => {
  switch (data) {
    case undefined: {
      return <LoadingGallery />
    }

    case 'empty': {
      return (
        <EmptyGallery
          headline="No available SVGs to gobble"
          description="Upload your own SVGs to this page and optimize them using SVGO"
        />
      )
    }

    case 'system': {
      return (
        <EmptyGallery
          headline="Upload an SVG"
          description="Drag SVGs onto this page to optimize it"
        />
      )
    }

    case 'error': {
      return (
        <EmptyGallery
          headline="Shucks, something went wrong"
          description="Close this page and try again or upload your own SVGs"
        />
      )
    }

    default: {
      return <DataGallery data={data} setData={setData} />
    }
  }
}

export default Gallery
