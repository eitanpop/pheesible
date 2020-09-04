import React from 'react'

export default ({ promotion, updatePromotion }) => {
  const updateFieldsOnPromotion = (key, value) => {
    const fields = { ...promotion.fields, [key]: value }
    updatePromotion('fields', fields)
  }

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
          />
        </div>

        <div class='form-group'>
          <label for='tagLine'>Tag line</label>
          <textarea
            class='form-control'
            id='tagLine'
            rows='2'
            onChange={(e) =>
              updateFieldsOnPromotion('tagLine', e.target.value)
            }></textarea>
        </div>

        <div class='form-group'>
          <label for='summary'>Elevator Pitch</label>
          <textarea
            class='form-control'
            id='tagLine'
            rows='6'
            onChange={(e) =>
              updateFieldsOnPromotion('elevatorPitch', e.target.value)
            }></textarea>
        </div>
      </div>
    </>
  )
}
