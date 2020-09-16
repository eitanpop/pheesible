import React from 'react'

import { remove } from '../services/storage'

export default ({ value, clearFunction }) => {
  return value ? (
    <div>
      <button
        onClick={(e) => {
          clearFunction()
          remove(value)
        }}
        className='btn btn-link'>
        <sm>clear</sm>
      </button>
    </div>
  ) : (
    ''
  )
}
