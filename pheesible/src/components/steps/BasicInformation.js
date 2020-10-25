import React from 'react'

import useError from '../../hooks/useError'
import Uploader from '../file/Uploader'
import ErrorMessage from '../ErrorMessage'
import CardTitle from '../wizard/CardTitle'
import CardSubTitle from '../wizard/CardSubTitle'
import HeaderSpacer from '../wizard/HeaderSpacer'
import Info from '../Info'

export default ({
  promotion,
  updatePromotion,
  isRequestingNextStep,
  stopRequestingNextStep,
  setIsNextStepConfirmed,
}) => {
  const updateFieldsOnPromotion = (key, value) => {
    const fields = { ...promotion.fields, [key]: value }
    updatePromotion('fields', fields)
  }
  const { name } = promotion
  const { title, tagLine, elevatorPitch } = promotion.fields

  const error = useError(
    isRequestingNextStep,
    stopRequestingNextStep,
    setIsNextStepConfirmed,
    (addError, setIsValid) => {
      if (!name) {
        setIsValid(false)
        addError('name', 'Please fill out a campaign name')
      }
      if (!tagLine) {
        setIsValid(false)
        addError('tagLine', 'Please fill out a tag line')
      }
      if (!title) {
        setIsValid(false)
        addError('title', 'Please fill out a title')
      }

      if (!elevatorPitch) {
        setIsValid(false)
        addError('elevatorPitch', 'Please fill out an elevator pitch')
      }
    },
    [JSON.stringify(promotion)]
  )

  return (
    <>
      <div className='card'>
        <div className='card-body'>
          
          <CardTitle toolTip='The landing page is an engagine and beautiful '>
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
            />
            <ErrorMessage errorMessage={error.title} />
          </div>
          <div className='form-group'>
            <label htmlFor='title' className='fieldTitle'>
              Logo
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
              Banner
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
              Tag line*
            </label>
            <textarea
              className={`form-control ${error.tagLine ? ' has-error ' : ''}`}
              id='tagLine'
              rows='2'
              onChange={(e) =>
                updateFieldsOnPromotion('tagLine', e.target.value)
              }
              value={tagLine || ''}></textarea>
            <ErrorMessage errorMessage={error.tagLine} />
          </div>
          <div className='form-group'>
            <label htmlFor='elevatorPitch' className='fieldTitle'>
              Elevator Pitch*
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
              value={elevatorPitch || ''}></textarea>
            <ErrorMessage errorMessage={error.elevatorPitch} />
          </div>
        </div>
      </div>
    </>
  )
}
