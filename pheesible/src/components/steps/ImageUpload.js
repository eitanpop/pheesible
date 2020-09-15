import React from 'react'

import Uploader from '../Uploader'

export default ({ promotion, updatePromotion }) => {
  const updateImageOnPromotion = (imageName, key) => {
    const images = { ...promotion.images, [imageName]: key }
    updatePromotion('images', images)
  }
  return (
    <div>
      <div className='form-group'>
        <label htmlFor='title'>Image 1</label>
        <div className='input-group'>
          <div className='input-group-prepend'>
            <span className='input-group-text' id='inputGroupFileAddon01'>
              Upload:
            </span>
          </div>
          <Uploader
            path='images'
            onUpload={(result) => updateImageOnPromotion('imageOne', result)}
          />
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='title'>Image 2</label>
        <div className='input-group'>
          <div className='input-group-prepend'>
            <span className='input-group-text' id='inputGroupFileAddon01'>
              Upload
            </span>
          </div>
          <Uploader
            path='images'
            onUpload={(result) => updateImageOnPromotion('imageTwo', result)}
          />
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='title'>Image 3</label>
        <div className='input-group'>
          <div className='input-group-prepend'>
            <span className='input-group-text' id='inputGroupFileAddon01'>
              Upload
            </span>
          </div>
          <Uploader
            path='images'
            onUpload={(result) => updateImageOnPromotion('imageThree', result)}
          />
        </div>
      </div>
    </div>
  )
}
