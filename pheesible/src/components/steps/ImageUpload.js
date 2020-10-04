import React from 'react'

import Uploader from '../file/Uploader'
import CardSubTitle from '../wizard/CardSubTitle'
import HeaderSpacer from '../wizard/HeaderSpacer'

export default ({
  promotion,
  updatePromotion,
  isRequestingNextStep,
  stopRequestingNextStep,
  setIsNextStepConfirmed,
}) => {
  const updateImageOnPromotion = (imageName, key) => {
    const images = { ...promotion.images, [imageName]: key }
    updatePromotion('images', images)
  }
  if (isRequestingNextStep) {
    console.log('isValidating is true and setting currentStepValid to true')
    setIsNextStepConfirmed(true)
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <CardSubTitle tooltip=''>Images</CardSubTitle>
        <HeaderSpacer />
        <div className='form-group'>
          <label htmlFor='title' className='fieldTitle'>
            Image 1
          </label>
          <div className='input-group'>
            <Uploader
              templateId={promotion.templateId}
              path='images'
              onUpload={(result) => updateImageOnPromotion('imageOne', result)}
              value={promotion.images.imageOne}
              clearFunction={() => updateImageOnPromotion('imageOne', null)}
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='title' className='fieldTitle'>
            Image 2
          </label>
          <div className='input-group'>
            <Uploader
              templateId={promotion.templateId}
              path='images'
              onUpload={(result) => updateImageOnPromotion('imageTwo', result)}
              value={promotion.images.imageTwo}
              clearFunction={() => updateImageOnPromotion('imageTwo', null)}
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='title' className='fieldTitle'>
            Image 3
          </label>

          <div className='input-group'>
            <Uploader
              templateId={promotion.templateId}
              path='images'
              onUpload={(result) =>
                updateImageOnPromotion('imageThree', result)
              }
              value={promotion.images.imageThree}
              clearFunction={() => updateImageOnPromotion('imageThree', null)}
            />
          </div>
        </div>
        <br />
        <hr stlye={{ width: '90%' }} />
        <CardSubTitle tooltip=''>Additional Information</CardSubTitle>
        <div class='form-group'>
          <label for='exampleFormControlTextarea1' className='fieldTitle'>
            Description
          </label>
          <textarea
            class='form-control'
            id='exampleFormControlTextarea1'
            rows='3'
            value={promotion.freeText}
            onChange={(e) =>
              updatePromotion('freeText', e.target.value)
            }></textarea>
        </div>
      </div>
    </div>
  )
}
