import React from 'react'

export default (props) => {
  return (
    <button {...props} disabled={props.isLoading}>
      {!props.isLoading ? (
        props.children
      ) : (
        <div
          class='spinner-border '
          style={{ width: '15px', height: '15px' }}
          role='status'>
          <span class='sr-only'>Loading...</span>
        </div>
      )}
    </button>
  )
}
