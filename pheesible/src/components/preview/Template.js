import React from 'react'
import City from '../templates/TheCity'
import Serenity from '../templates/Serenity'

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
    case 'serenity':
      component = <Serenity />
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
