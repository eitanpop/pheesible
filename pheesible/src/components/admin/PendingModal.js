import React from 'react'

import Modal from './Modal'

export default ({ modals, setModals, modalProperty, children }) => {
  if (!children) {
    return <div>No Content</div>
  }
  return (
    <>
      {' '}
      <Modal
        isShowing={modals[modalProperty]}
        onClose={() => setModals({ ...modals, [modalProperty]: false })}>
        {children}
      </Modal>
      <button
        className='btn btn-link'
        onClick={() => setModals({ ...modals, [modalProperty]: true })}>
        Click to see
      </button>
    </>
  )
}
