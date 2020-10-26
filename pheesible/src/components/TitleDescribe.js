import React from 'react'

export default ({
  sellingPoint,
  onSellingPointChange,
  titleLabelText,
  descriptionLabelText,
}) => {
  return (
    <>
      <div className='form-group'>
        <label htmlFor='title' className='fieldTitle'>
          {titleLabelText || 'Title'}
        </label>
        <input
          className='form-control'
          id='title'
          placeholder={titleLabelText || 'Title'}
          onChange={(e) =>
            onSellingPointChange({ ...sellingPoint, title: e.target.value })
          }
          value={sellingPoint.title || ''}
          maxLength='1000'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='description' className='fieldTitle'>
          {descriptionLabelText || 'Description'}
        </label>
        <textarea
          className='form-control'
          id='description'
          rows='3'
          onChange={(e) =>
            onSellingPointChange({
              ...sellingPoint,
              description: e.target.value,
            })
          }
          value={sellingPoint.description}
          maxLength='2000'></textarea>
      </div>
    </>
  )
}
