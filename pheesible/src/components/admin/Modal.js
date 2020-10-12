import React from 'react'

export default ({ children, isShowing = false, onClose }) => {
  return (
    <div
      className='modal'
      tabindex='-1'
      style={{ display: isShowing ? 'block' : 'none' }}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Content</h5>
            <button
              type='button'
              className='close'
              aria-label='Close'
              onClick={() => onClose()}>
              X
            </button>
          </div>
          <div className='modal-body'>
            <p>{children}</p>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={() => onClose()}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
