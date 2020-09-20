import React, { useEffect, useState } from 'react'

import { getPromotions } from '../services/api'
import ApiContext from '../context/promotionContext'

export default ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [promotions, setPromotions] = useState(null)
  useEffect(() => {
    async function fetchData() {
      const promotionData = await getPromotions()
      setPromotions(promotionData.data)
      setLoading(false)
    }

    fetchData()
  }, [])
  return (
    <ApiContext.Provider value={{ promotions, loading }}>
      {children}
    </ApiContext.Provider>
  )
}
