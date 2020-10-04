import React from 'react'

export default ({ name, img, getValue, updateValue, otherFocusGroup }) => {
  const {
    name: otherFocusGroupName,
    img: otherFocusGroupImg,
    getValue: otherFocusGroupGetValue,
    updateValue: otherFocusGroupUpdateValue,
  } = otherFocusGroup
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
            checked={getValue('isEnabled') === true}
            onClick={(e) => updateValue('isEnabled', e.target.checked)}
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
                id='customSwitch2'
                checked={otherFocusGroupGetValue('isEnabled') === true}
                onChange={(e) => otherFocusGroupUpdateValue(e.target.checked)}
              />
              <label
                className='custom-control-label'
                for='customSwitch2'></label>
            </div>
          </div>
          <div className='mt-4'></div>
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
            value={getValue('numberOfDays')}
            onChange={(e) => updateValue('numberOfDays', e.target.value)}
          />
        </div>
        <div className='form-group col-md-5'>
          <label for='inputBudget small'>Budget</label>
          <input
            type='number'
            className='form-control'
            id='inputBudget'
            placeholder='$'
            value={getValue('budgetPerDayInDollars')}
            onChange={(e) =>
              updateValue('budgetPerDayInDollars', e.target.value)
            }
          />
        </div>
      </div>
    </>
  )
}
