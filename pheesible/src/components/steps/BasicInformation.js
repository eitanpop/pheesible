import React from 'react'

export default ({ promotion, updatePromotion }) => {
  const updateFieldsOnPromotion = (key, value) => {
    const fields = { ...promotion.fields, [key]: value }
    updatePromotion('fields', fields)
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
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text' id='inputGroupFileAddon01'>
                Upload
              </span>
            </div>
            <div className='custom-file'>
              <input
                type='file'
                className='custom-file-input'
                id='inputGroupFile01'
                aria-describedby='inputGroupFileAddon01'
              />
              <label className='custom-file-label' htmlFor='inputGroupFile01'>
                Choose file
              </label>
            </div>
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
