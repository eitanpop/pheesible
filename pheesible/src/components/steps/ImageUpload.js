import React from 'react'

import Uploader from '../file/Uploader'
import CardTitle from '../wizard/CardTitle'
import HeaderSpacer from '../wizard/HeaderSpacer'

export default ({
  promotion,
  updatePromotion,
  navigator
}) => {
  console.log('navigator', navigator)
  const { isRequestingNextStep, stopRequestingNextStep, setIsNextStepConfirmed } = navigator

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
        <CardTitle tooltip='Optional images (the template has default images) to add to the landing page. Adding images will update the adjacent preview in real time'>Images</CardTitle>
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
        <CardTitle tooltip='Free text to add any other pertinent information such as a quote or an extra selling point. Adding additional information will update the adjacent preview in real time.'>Additional Information</CardTitle>
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
