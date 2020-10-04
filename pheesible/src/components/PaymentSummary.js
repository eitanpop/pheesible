import React from 'react'
import getTotalCharge from '../selectors/getTotalCharge'

export default ({ promotion }) => {

  return (
    <div>
      <div className='row'>
        <div className='col-sm-6'>Number of days</div>
        <div className='col-sm-6'>{1}</div>
      </div>
      <div className='row'>
        <div className='col-sm-6'>Budget per day</div>
        <div className='col-sm-6'>${1}</div>
      </div>
      <div className='row'>
        <div className='col-sm-6'>Pheesible fee</div>
        <div className='col-sm-6'>$200</div>
      </div>
      <hr />
      <div className='row'>
        <div className='col'>{getTotalCharge(promotion)}</div>
      </div>
    </div>
  )
}
