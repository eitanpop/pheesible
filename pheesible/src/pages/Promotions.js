import React, { useContext } from 'react'

import ApiContext from '../context/promotionContext'

export default () => {
  const { promotions } = useContext(ApiContext)
  console.log('promotions from API', promotions)
  return promotions.map((x) => {
    const { title } = x
    return <div>{title}</div>
  })
}
