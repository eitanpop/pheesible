import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ApiContext from '../context/apiContext'

export default ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [promotions, setPromotions] = useState(null)
  useEffect(() => {
    async function fetchData() {
      const promotionData = await axios.get(
        `${process.env.REACT_APP_API_URL}promotion`
      )
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
