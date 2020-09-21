import React, { useEffect, useState } from 'react'

import { getPromotions, getTemplates } from '../services/api'
import ApiContext from '../context/promotionContext'

export default ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [promotions, setPromotions] = useState(null)
  const [templates, setTemplates] = useState(null)
  useEffect(() => {
    async function fetchData() {
      const promotionData = await getPromotions()
      const templateData = await getTemplates()
      setPromotions(promotionData)
      setTemplates(templateData)
      setLoading(false)
    }

    fetchData()
  }, [])
  if (loading) return <div>Loading...</div>
  return (
    <ApiContext.Provider value={{ promotions, templates, loading }}>
      {children}
    </ApiContext.Provider>
  )
}
