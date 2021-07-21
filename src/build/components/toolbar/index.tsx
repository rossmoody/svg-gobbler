import React from 'react'

import { AppData } from '../../types'

import LoadingToolbar from './loading-toolbar'
import DataToolbar from './data-toolbar'

interface ToolbarData {
  data: AppData
  setData: React.Dispatch<React.SetStateAction<AppData>>
  location: string
}

const Toolbar = ({ data, setData, location }: ToolbarData) => {
  switch (data) {
    case undefined: {
      return <LoadingToolbar />
    }

    default: {
      return <DataToolbar data={data} setData={setData} location={location} />
    }
  }
}

export default Toolbar
