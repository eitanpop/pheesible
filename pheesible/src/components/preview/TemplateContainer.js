import React from 'react'

import useTemplates from '../../hooks/api/useTemplates'
import Template from './Template'

export default ({
  promotion,
  logo,
  banner,
  imageOne,
  imageTwo,
  imageThree,
  isLive,
}) => {
  const { error, loading, data: templates } = useTemplates()
  if (error) return <div>Unexpected error</div>
  if (loading) return <div>Loading...</div>
  const name = (
    templates.find((x) => x.Id === promotion.templateId) || templates[0]
  ).Name.toLowerCase()

  return (
    <Template
      templateName={name}
      promotion={promotion}
      logo={logo}
      banner={banner}
      imageOne={imageOne}
      imageTwo={imageTwo}
      imageThree={imageThree}
      isLive={isLive}
    />
  )
}
