import React from 'react'

export default ({ name, img, otherFocusGroup }) => {
  const { name: otherFocusGroupName, img: otherFocusGroupImg } = otherFocusGroup
  return (
    <>
      <div className='d-flex align-items-center justify-content-between'>
        <a href='#' class='product-thumb'>
          <img src={img} alt={name} />
          <span className='name ml-1'>{name}</span>
        </a>
        <div class='custom-control custom-switch'>
          <input
            type='checkbox'
            className='custom-control-input'
            id='customSwitch1'
          />
          <label className='custom-control-label' for='customSwitch1'></label>
        </div>
      </div>
      {otherFocusGroup ? (
        <div>
          <div className='mt-3'>
            <a href='#' class='product-thumb'>
              <img src={otherFocusGroupImg} alt={otherFocusGroupName} />
              <span className='name ml-1'>{otherFocusGroupName}</span>
            </a>
            <div
              class='custom-control custom-switch'
              style={{ display: 'inline', float: 'right' }}>
              <input
                type='checkbox'
                className='custom-control-input'
                id='customSwitch1'
              />
              <label
                className='custom-control-label'
                for='customSwitch1'></label>
            </div>
          </div>
          <div className="mt-4"></div>
        </div>
      ) : (
        ''
      )}
      <div className='form-row d-flex justify-content-between mt-1'>
        <div className='form-group col-md-5'>
          <label for='inputSpecificDuration small'>Duration</label>
          <input
            type='text'
            className='form-control'
            id='inputSpecificDuration'
            placeholder='Days'
          />
        </div>
        <div className='form-group col-md-5'>
          <label for='inputBudget small'>Budget</label>
          <input
            type='number'
            className='form-control'
            id='inputBudget'
            placeholder='$'
          />
        </div>
      </div>
    </>
  )
}
