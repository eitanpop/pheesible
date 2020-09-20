import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPromotion } from '../services/api'
import Preview from '../components/preview/Preview'

export default () => {
  const [loading, setLoading] = useState(true)
  const [promotion, setPromotions] = useState(null)
  const { id } = useParams()
  useEffect(() => {
    async function fetchData() {
      const promotionData = await getPromotion(id)
      console.log('promotionData', promotionData)
      setPromotions(promotionData.data)
      setLoading(false)
    }
    fetchData()
  }, [id])

  if (loading) return <div>Loading...</div>
  console.log('promotions', promotion)
  return <Preview promotion={promotion} fullScreen={true} />
}
