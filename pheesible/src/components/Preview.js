import React from 'react'

import { Template } from '../constants'
import Business from './templates/business'
import WideLogo from './templates/widelogo'

const getPromotion = (template, promotion) => {
  switch (template) {
    case Template.Business:
      return <Business promotion={promotion} />
    case Template.WideLogo:
      return <WideLogo promotion={promotion} />
    default:
      throw Error('invalid template')
  }
}
export default ({ promotion }) => {
  const { template } = promotion
  return (
    <div
      className='mt-2 bg-white preview-container'
      style={{ maxWidth: 'calc(100% - 48px)', width: '972px' }}>
      <div className='preview m-3'>{getPromotion(template, promotion)}</div>
    </div>
  )
}
