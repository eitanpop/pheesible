import React from 'react'

import Info from '../Info'

export default ({ children, tooltip }) => {
  console.log('tooltip', tooltip)
  return (
    <div class='d-flex justify-content-between'>
      <h5 class='mb-3 text-dark' style={{ textTransform: 'uppercase' }}>
        {children}
      </h5>
      <span className='text-dark'>
        <Info placement='bottom' tooltip={tooltip} />
      </span>
    </div>
  )
}
