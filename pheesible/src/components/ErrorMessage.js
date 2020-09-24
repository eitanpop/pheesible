import React from 'react'

export default ({errorMessage}) => {
  return (
    <>
      {errorMessage ? (
        <div className='error-message'>{errorMessage}</div>
      ) : (
        <></>
      )}
    </>
  )
}
