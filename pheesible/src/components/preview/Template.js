import React from 'react'
import Business from '../templates/business'
import WideLogo from '../templates/widelogo'

export default ({
  templateName,
  promotion,
  logo,
  banner,
  imageOne,
  imageTwo,
  imageThree,
}) => {
  let component = null
  switch (templateName.toLowerCase()) {
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
