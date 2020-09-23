import React from 'react'

import Uploader from '../file/Uploader'
import FileClear from '../file/FileClear'

export default ({ promotion, updatePromotion, isValidating, setStepValid }) => {
  const updateFieldsOnPromotion = (key, value) => {
    const fields = { ...promotion.fields, [key]: value }
    updatePromotion('fields', fields)
  }

  if (isValidating) {
    console.log('isValidating is true and setting currentStepValid to true')
    setStepValid(true)
  }

  const { title, tagLine, elevatorPitch } = promotion.fields

  return (
    <>
      <div>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            className='form-control'
            id='title'
            placeholder='Title'
            onChange={(e) => updateFieldsOnPromotion('title', e.target.value)}
            value={title || ''}
          />
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
          <label htmlFor='tagLine'>Tag line</label>
          <textarea
            className='form-control'
            id='tagLine'
            rows='2'
            onChange={(e) => updateFieldsOnPromotion('tagLine', e.target.value)}
            value={tagLine || ''}></textarea>
        </div>

        <div className='form-group'>
          <label htmlFor='summary'>Elevator Pitch</label>
          <textarea
            className='form-control'
            id='tagLine'
            rows='6'
            onChange={(e) =>
              updateFieldsOnPromotion('elevatorPitch', e.target.value)
            }
            value={elevatorPitch || ''}></textarea>
        </div>
      </div>
    </>
  )
}
