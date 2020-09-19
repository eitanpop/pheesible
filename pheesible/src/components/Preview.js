import React, { useState } from 'react'

import useImageEffect from '../hooks/useImageEffect'
import { Template } from '../constants'
import Business from './templates/business'
import WideLogo from './templates/widelogo'

const getPromotion = (
  promotion,
  logo,
  banner,
  imageOne,
  imageTwo,
  imageThree
) => {
  const { templateId } = promotion
  switch (templateId) {
    case Template.Business:
      return (
        <Business
          promotion={promotion}
          logo={logo}
          banner={banner}
          imageOne={imageOne}
          imageTwo={imageTwo}
          imageThree={imageThree}
        />
      )
    case Template.WideLogo:
      return (
        <WideLogo
          promotion={promotion}
          logo={logo}
          banner={banner}
          imageOne={imageOne}
          imageTwo={imageTwo}
          imageThree={imageThree}
        />
      )
    default:
      throw Error('invalid template')
  }
}

export default ({ promotion, isLive = false }) => {
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

  return (
    <div
      className='mt-2 bg-white preview-container'
      style={{ maxWidth: 'calc(100% - 48px)', width: '972px' }}>
      <div className='preview m-3'>
        {getPromotion(promotion, logo, banner, imageOne, imageTwo, imageThree)}
      </div>
    </div>
  )
}
