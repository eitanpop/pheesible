import React, { useState } from 'react'

import useImageEffect from '../../hooks/useImageEffect'
import TemplateContainer from './TemplateContainer'
import Template from './Template'

export default ({ promotion, isLive = false, fullScreen = false }) => {
  const [logo, setLogo] = useState(null)
  const [banner, setBanner] = useState(null)
  const [imageOne, setImageOne] = useState(null)
  const [imageTwo, setImageTwo] = useState(null)
  const [imageThree, setImageThree] = useState(null)
  useImageEffect(promotion.fields.logo, promotion.identityId, setLogo)
  useImageEffect(promotion.fields.banner, promotion.identityId, setBanner)
  useImageEffect(promotion.images.imageOne, promotion.identityId, setImageOne)
  useImageEffect(promotion.images.imageTwo, promotion.identityId, setImageTwo)
  useImageEffect(
    promotion.images.imageThree,
    promotion.identityId,
    setImageThree
  )

  if (!promotion) return <div>Loading...</div>

  if (fullScreen)
    return (
      <>
        <Template
          templateName={promotion.templateName}
          promotion={promotion}
          logo={logo}
          banner={banner}
          imageOne={imageOne}
          imageTwo={imageTwo}
          imageThree={imageThree}
          isLive={isLive}
        />
      </>
    )

  return (
    <div
      className='mt-2 bg-white py-3 needs-validation container'
      style={{ padding: '5px 40px', maxWidth: '1440px' }}>
      <div className='preview m-3'>
        <TemplateContainer
          promotion={promotion}
          logo={logo}
          banner={banner}
          imageOne={imageOne}
          imageTwo={imageTwo}
          imageThree={imageThree}
          isLive={isLive}
        />
      </div>
    </div>
  )
}
