import React, { useContext } from 'react'

import PromotionContext from '../context/promotionContext'
import Business from './templates/business'
import WideLogo from './templates/widelogo'

export default ({
  promotion,
  logo,
  banner,
  imageOne,
  imageTwo,
  imageThree,
}) => {
  const { templates } = useContext(PromotionContext)
  const name = templates
    .find((x) => x.Id === promotion.templateId)
    .Name.toLowerCase()
  let component = null
  switch (name) {
    case 'business':
      component = <Business />
      break
    case 'wide logo':
      component = <WideLogo />
      break
    default:
      throw Error('invalid template')
  }

  return React.cloneElement(component, {
    promotion,
    logo,
    banner,
    imageOne,
    imageTwo,
    imageThree,
  })
}
