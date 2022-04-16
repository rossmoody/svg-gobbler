import React from 'react'

import { useData } from '../../providers/data-provider'

import LoadingToolbar from './loading-toolbar'
import DataToolbar from './data-toolbar'

const Toolbar = () => {
  const { data, setData } = useData()

  switch (data) {
    case undefined: {
      return <LoadingToolbar />
    }

    default: {
      return <DataToolbar data={data} setData={setData} />
    }
  }
}

export default Toolbar
