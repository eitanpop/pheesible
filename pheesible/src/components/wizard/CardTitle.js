import React from 'react'

export default ({ children, tooltip = null }) => {
  return (
    <div class='d-flex justify-content-between'>
      <h5 class='mb-3 text-dark' style={{ textTransform: 'uppercase' }}>
        {children}
      </h5>
      <button
        type='button'
        class='btn btn-secondary infotext-medium mr-3'
        data-toggle='tooltip'
        data-html='true'
        data-placement='top'
        title={tooltip}>
        i
      </button>
    </div>
  )
}
