import React from 'react'
import useTemplates from '../../hooks/api/useTemplates'

import businessImage from '../templates/business/ad/image.png'

export default ({ promotion, image }) => {
  const { error, loading, data: templates } = useTemplates()
  if (loading) return <div>Loading...</div>
  if (error) return <div>Unexpected error</div>
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

  return <img style={{ maxWidth: '900px' }} src={image} alt='AD' />
}
