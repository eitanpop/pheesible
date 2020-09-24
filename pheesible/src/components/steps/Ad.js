import React from 'react'

import useError from '../../hooks/useError'
import Uploader from '../file/Uploader'
import FileClear from '../file/FileClear'
import ErrorMessage from '../ErrorMessage'

export default ({
  promotion,
  updatePromotion,
  isRequestingNextStep,
  stopRequestingNextStep,
  setIsNextStepConfirmed,
}) => {
  const updateAdOnPromotion = (key, value) => {
    const ad = { ...promotion.ad, [key]: value }
    updatePromotion('ad', ad)
  }

  const error = useError(
    isRequestingNextStep,
    stopRequestingNextStep,
    setIsNextStepConfirmed,
    (addError, setIsValid) => {
      if (!promotion.ad.text) {
        setIsValid(false)
        addError('text', 'Please add some text for the ad')
      }
    },
    [JSON.stringify(promotion)]
  )

  return (
    <>
      <div className='form-group'>
        <label htmlFor='title'>Image</label>
        <FileClear
          value={promotion.ad.image}
          clearFunction={() => updateAdOnPromotion('image', null)}
        />
        <div className='input-group'>
          <div className='input-group-prepend'>
            <span className='input-group-text' id='inputGroupFileAddon01'>
              Upload
            </span>
          </div>
          <Uploader
            path='ad'
            onUpload={(result) => updateAdOnPromotion('image', result)}
            templateId={promotion.templateId}
          />
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='summary'>AD Text</label>
        <textarea
          className={`form-control ${error.text ? ' has-error ' : ''}`}
          id='tagLine'
          rows='6'
          onChange={(e) => updateAdOnPromotion('text', e.target.value)}
          value={promotion.ad.text || ''}></textarea>
        <ErrorMessage errorMessage={error.text} />
      </div>
    </>
  )
}
