import React from 'react'

import Uploader from '../file/Uploader'
import FileClear from '../file/FileClear'

export default ({ promotion, updatePromotion }) => {
  const updateAdOnPromotion = (key, value) => {
    const ad = { ...promotion.ad, [key]: value }
    updatePromotion('ad', ad)
  }
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
          />
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='summary'>AD Text</label>
        <textarea
          className='form-control'
          id='tagLine'
          rows='6'
          onChange={(e) => updateAdOnPromotion('text', e.target.value)}
          value={promotion.ad.text || ''}></textarea>
      </div>
    </>
  )
}
