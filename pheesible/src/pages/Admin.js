import React, { useState } from 'react'

import Pending from '../components/admin/Pending'

export default () => {
  const [filter, setFilter] = useState(1)
  return (
    <div className='container-fluid h-100'>
      <div className='row h-100'>
        <div className='col-sm-2' id='sidebar'>
          <div className='mt-3'>STATUS</div>
          <ul className='mt-2 list-unstyled components'>
            <li>
              <a
                href='#'
                onClick={(e) => setFilter(1)}
                style={{ fontWeight: filter === 1 ? 'bold' : 'normal' }}>
                PENDING REVIEW
              </a>
            </li>
          </ul>
        </div>
        <div className='col-sm-10'>{filter === 1 ? <Pending /> : ''}</div>
      </div>
    </div>
  )
}
