import React, { useContext } from 'react'

import ApiContext from '../context/apiContext'

export default () => {
  const { loading, promotions } = useContext(ApiContext)
  console.log('loading', loading)
  console.log('promotions from API', promotions)
  if (loading) return <div>Loading...</div>
  return promotions.map((x) => {
    const { Title } = x
    return <div>{Title}</div>
  })
}
