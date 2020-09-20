import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Preview from '../components/Preview'

export default () => {
  const [loading, setLoading] = useState(true)
  const [promotion, setPromotions] = useState(null)
  const { id } = useParams()
  useEffect(() => {
    async function fetchData() {
      const promotionData = await axios.get(
        `${process.env.REACT_APP_API_URL}promotion/${id}`
      )
      setPromotions(promotionData.data)
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  console.log('promotions', promotion)
  return <Preview promotion={promotion} fullScreen={true} />
}
