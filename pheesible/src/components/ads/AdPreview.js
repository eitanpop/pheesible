import React, { useState } from 'react'

import useImageEffect from '../../hooks/useImageEffect'
import AdImage from './AdImage'

export default ({ promotion, isLive = false }) => {
  if (!promotion) return <div>Loading...</div>

  const [image, setImage] = useState(null)
  useImageEffect(promotion.ad.image, promotion.identityId, setImage)

  return (
    <div
      className='mt-2 bg-white '
      style={{  width: '972px' }}>
      <div className='preview m-3'>
        <>
          <div>
            <AdImage promotion={promotion} image={image} />
          </div>
          <div>{promotion.ad.text}</div>
        </>
      </div>
    </div>
  )
}
