import React from 'react'

import useError from '../../hooks/useError'
import Uploader from '../file/Uploader'
import FileClear from '../file/FileClear'
import ErrorMessage from '../ErrorMessage'
import CardTitle from '../wizard/CardTitle'

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

  const { title, tagLine, elevatorPitch } = promotion.fields

  const error = useError(
    isRequestingNextStep,
    stopRequestingNextStep,
    setIsNextStepConfirmed,
    (addError, setIsValid) => {
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
          <CardTitle toolTip='This is a test tooltip'>Landing Page</CardTitle>
          <div className='text-body'>Basic Information</div>

          <div className='form-group'>
            <label htmlFor='title'>Title*</label>
            <input
              className={`form-control ${error.title ? ' has-error ' : ''}`}
              id='title'
              onChange={(e) => updateFieldsOnPromotion('title', e.target.value)}
              value={title || ''}
            />
            <ErrorMessage errorMessage={error.title} />
          </div>

          <div className='form-group'>
            <label htmlFor='title'>Logo</label>
            <FileClear
              value={promotion.fields.logo}
              clearFunction={() => updateFieldsOnPromotion('logo', null)}
            />
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text' id='inputGroupFileAddon01'>
                  Upload
                </span>
              </div>
              <Uploader
                templateId={promotion.templateId}
                path='logos'
                onUpload={(result) => updateFieldsOnPromotion('logo', result)}
              />
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='title'>Banner</label>
            <FileClear
              value={promotion.fields.banner}
              clearFunction={() => updateFieldsOnPromotion('banner', null)}
            />
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text' id='inputGroupFileAddon01'>
                  Upload
                </span>
              </div>
              <Uploader
                templateId={promotion.templateId}
                path='banners'
                onUpload={(result) => updateFieldsOnPromotion('banner', result)}
              />
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='tagLine'>Tag line*</label>
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
            <label htmlFor='summary'>Elevator Pitch*</label>
            <textarea
              className={`form-control ${
                error.elevatorPitch ? ' has-error ' : ''
              }`}
              id='tagLine'
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
