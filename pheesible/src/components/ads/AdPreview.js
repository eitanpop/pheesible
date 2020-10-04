import React, { useState } from 'react'

import useImageEffect from '../../hooks/useImageEffect'
import AdImage from './AdImage'

export default ({ promotion, isLive = false }) => {
  if (!promotion) return <div>Loading...</div>

  const [image, setImage] = useState(null)
  useImageEffect(promotion.ad.image, promotion.identityId, setImage)

  return (
    <div
      className='mt-2 bg-white py-3 needs-validation text-center'
      style={{ maxWidth: '972px', padding: '5px 40px' }}>
      <div className='d-flex justify-content-center'>
        <AdImage promotion={promotion} image={image} />
      </div>
      <br />
      <hr style={{ width: '90%' }} />
      <br />
      <div>{promotion.ad.text}</div>
    </div>
  )
}
