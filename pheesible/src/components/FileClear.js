import React from 'react'

export default ({ value, clearFunction }) => {
  return value ? (
    <div>
      <button
        onClick={(e) => {
          clearFunction()
        }}
        className='btn btn-link'>
        <sm>clear</sm>
      </button>
    </div>
  ) : (
    ''
  )
}
