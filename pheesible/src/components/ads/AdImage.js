import React, { useContext } from 'react'

import PromotionContext from '../../context/promotionContext'

import businessImage from '../templates/business/ad/image.png'

export default ({ promotion, image }) => {
  const { templates } = useContext(PromotionContext)

  console.log('templates', templates)
  if (!image) {
    const name = templates
      .find((x) => x.Id === promotion.templateId)
      .Name.toLowerCase()

    switch (name) {
      case 'business':
        image = businessImage
        break
      case 'wide logo':
        image = businessImage
        break
      default:
        throw Error('invalid template')
    }
  }

  return <img src={image} alt='AD' />
}
