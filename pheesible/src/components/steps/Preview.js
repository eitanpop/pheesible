import React, { useState, useEffect } from 'react'

import { Template } from '../../constants'
import Business from '../templates/business'
import WideLogo from '../templates/widelogo'
import { get } from '../../services/storage'

const getPromotion = (promotion, logo, banner) => {
  const { template } = promotion
  switch (template) {
    case Template.Business:
      return <Business promotion={promotion} logo={logo} banner={banner} />
    case Template.WideLogo:
      return <WideLogo promotion={promotion} logo={logo} banner={banner} />
    default:
      throw Error('invalid template')
  }
}

const useImageEffect = (key, identityId, setter) => {
  useEffect(() => {
    const getLogo = async () => {
      if (!key) return
      setter(await get(key, identityId))
      console.log('SETTING LOGO!!!')
    }
    getLogo()
  }, [key])
}
export default ({ promotion, isLive = false }) => {
  const [logo, setLogo] = useState(null)
  const [banner, setBanner] = useState(null)
  useImageEffect(promotion.fields.logo, promotion.identityId, setLogo)
  useImageEffect(promotion.fields.banner, promotion.identityId, setBanner)

  if (!promotion) return <div>Loading...</div>

  return (
    <div
      className='mt-2 bg-white preview-container'
      style={{ maxWidth: 'calc(100% - 48px)', width: '972px' }}>
      <div className='preview m-3'>{getPromotion(promotion, logo, banner)}</div>
    </div>
  )
}
