import React, { useState, useEffect } from 'react'

import useImageEffect from '../../hooks/useImageEffect'
import { getPublic } from '../../services/storage'

export default ({ promotion, isLive = false }) => {
  if (!promotion) return <div>Loading...</div>

  const [image, setImage] = useState(null)

  const setMyImage = async (x) => {
    console.log('image', x)
    if (x) {
      setImage(x)
      return
    }
    const defaultImage = `./templates/${promotion.templateId}/Ad/image.png`

    setImage(defaultImage)
  }
  useImageEffect(promotion.ad.image, promotion.identityId, setMyImage)

  return (
    <div
      className='mt-2 bg-white py-3 needs-validation text-center'
      style={{ maxWidth: '972px', padding: '5px 40px' }}>
      <div className='d-flex justify-content-center'>
        <img style={{ width: '600px' }} src={image} alt='ad' />
      </div>
      <br />
      <hr style={{ width: '90%' }} />
      <br />
      <div>{promotion.ad.text}</div>
    </div>
  )
}
