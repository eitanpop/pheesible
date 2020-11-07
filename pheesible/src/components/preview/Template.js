import React from 'react'
import City from '../templates/TheCity'

export default ({
  templateName,
  promotion,
  logo,
  banner,
  imageOne,
  imageTwo,
  imageThree,
  isLive,
}) => {
  let component = null
  switch (templateName.toLowerCase()) {
    case 'the city':
      component = <City />
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
    isLive,
  })
}
