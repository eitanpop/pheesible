import React from 'react'

import useValidator from '../../hooks/useValidator'
import Uploader from '../file/Uploader'
import ErrorMessage from '../ErrorMessage'
import CardTitle from '../wizard/CardTitle'
import CardSubTitle from '../wizard/CardSubTitle'
import HeaderSpacer from '../wizard/HeaderSpacer'
import Info from '../Info'

export default ({
  promotion,
  updatePromotion,
  navigator
}) => {
  const updateFieldsOnPromotion = (key, value) => {
    const fields = { ...promotion.fields, [key]: value }
    updatePromotion('fields', fields)
  }
  const { name } = promotion
  const { title, tagLine, elevatorPitch } = promotion.fields

  const error = useValidator(navigator,  
    (addError) => {
      if (!name) addError('name', 'Please fill out a campaign name')     
      if (!tagLine) addError('tagLine', 'Please fill out a tag line')     
      if (!title) addError('title', 'Please fill out a title')
      if (!elevatorPitch) addError('elevatorPitch', 'Please fill out an elevator pitch')      
    },
    [JSON.stringify(promotion)]
  )

  return (
    <>
      <div className='card'>
        <div className='card-body'>
          <CardTitle tooltip='The landing page is an optimized and attractive page to present your idea to visitors. The details you provide can be seen in the adjacent template preview page in real time.'>
            Landing Page
          </CardTitle>{' '}
          <HeaderSpacer />
          <CardSubTitle>Basic Information</CardSubTitle>
          <div className='form-group'>
            <label htmlFor='title' className='fieldTitle'>
              Title*
            </label>
            <input
              className={`form-control ${error.title ? ' has-error ' : ''}`}
              id='title'
              onChange={(e) => updateFieldsOnPromotion('title', e.target.value)}
              value={title || ''}
              maxLength='1000'
            />
            <ErrorMessage errorMessage={error.title} />
          </div>
          <div className='form-group'>
            <label htmlFor='title' className='fieldTitle'>
              Logo{' '}
              <Info tooltip='The smaller the logo, the faster the page will load.' />
            </label>

            <div className='input-group'>
              <Uploader
                templateId={promotion.templateId}
                path='logos'
                onUpload={(result) => updateFieldsOnPromotion('logo', result)}
                value={promotion.fields.logo}
                clearFunction={() => updateFieldsOnPromotion('logo', null)}
              />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='title' className='fieldTitle'>
              Banner{' '}
              <Info tooltip='The banner should have a ratio of around 3:5. The smaller the banner, the faster the page will load.' />
            </label>

            <div className='input-group'>
              <Uploader
                templateId={promotion.templateId}
                path='banners'
                onUpload={(result) => updateFieldsOnPromotion('banner', result)}
                value={promotion.fields.banner}
                clearFunction={() => updateFieldsOnPromotion('banner', null)}
              />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='tagLine' className='fieldTitle'>
              Tag Line*
            </label>
            <textarea
              className={`form-control ${error.tagLine ? ' has-error ' : ''}`}
              id='tagLine'
              rows='2'
              onChange={(e) =>
                updateFieldsOnPromotion('tagLine', e.target.value)
              }
              value={tagLine || ''}
              maxLength='1000'></textarea>
            <ErrorMessage errorMessage={error.tagLine} />
          </div>
          <div className='form-group'>
            <label htmlFor='elevatorPitch' className='fieldTitle'>
              Sales / Elevator Pitch*{' '}
              <Info tooltip='What is your idea / product? What service does it provide?' />
            </label>
            <textarea
              className={`form-control ${
                error.elevatorPitch ? ' has-error ' : ''
              }`}
              id='elevatorPitch'
              rows='6'
              onChange={(e) =>
                updateFieldsOnPromotion('elevatorPitch', e.target.value)
              }
              value={elevatorPitch || ''}
              maxLength='2000'></textarea>
            <ErrorMessage errorMessage={error.elevatorPitch} />
          </div>
        </div>
      </div>
    </>
  )
}
