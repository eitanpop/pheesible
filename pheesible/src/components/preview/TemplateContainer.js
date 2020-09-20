import React, { useContext } from 'react'

import PromotionContext from '../../context/promotionContext'
import Template from './Template'

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

  return (
    <Template
      templateName={name}
      promotion={promotion}
      logo={logo}
      banner={banner}
      imageOne={imageOne}
      imageTwo={imageTwo}
      imageThree={imageThree}
    />
  )
}
