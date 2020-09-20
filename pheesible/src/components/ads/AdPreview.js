import React, { useState, useEffect } from 'react'
import useImageEffect from '../../hooks/useImageEffect'
import AdImage from './AdImage'

const getPromotion = (promotion, image) => {
  return (
    <>
      <div>
        <AdImage promotion={promotion} image={image} />
      </div>
      <div>{promotion.ad.text}</div>
    </>
  )
}

export default ({ promotion, isLive = false }) => {
  if (!promotion) return <div>Loading...</div>
  const [image, setImage] = useState(null)
  const [component, setComponent] = useState(null)
  useImageEffect(promotion.ad.image, promotion.identityId, setImage)
  useEffect(() => {
    console.log('getting image!!')
    const getAdComponent = () => {
      setComponent(getPromotion(promotion, image))
    }
    getAdComponent()
  }, [image, promotion.ad.text])

  return (
    <div
      className='mt-2 bg-white preview-container'
      style={{ maxWidth: 'calc(100% - 48px)', width: '972px' }}>
      <div className='preview m-3'>{component}</div>
    </div>
  )
}
