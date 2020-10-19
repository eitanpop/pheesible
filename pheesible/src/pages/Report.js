import React from 'react'
import { useParams } from 'react-router-dom'

import useReport from '../hooks/api/useReport'

export default () => {
  const { id } = useParams()
  const report = useReport(id)

  return <div>{JSON.stringify(report)}</div>
}
