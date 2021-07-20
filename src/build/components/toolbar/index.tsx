import React from 'react'

import { AppData } from '../../layout'

import LoadingToolbar from './loading-toolbar'
import DataToolbar from './data-toolbar'

interface ToolbarData {
  data: AppData
}

const Toolbar = ({ data }: ToolbarData) => {
  switch (data) {
    case undefined: {
      return <LoadingToolbar />
    }

    case 'empty': {
      return <DataToolbar data={data} />
    }

    case 'system': {
      return <DataToolbar data={data} />
    }

    default: {
      return <DataToolbar data={data} />
    }
  }
}

export default Toolbar
