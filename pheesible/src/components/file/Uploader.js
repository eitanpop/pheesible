import React from 'react'

import { upload } from '../../services/storage'

export default ({ path = '', onUpload }) => {
  return (
    <div className='custom-file'>
      <input
        type='file'
        className='custom-file-input'
        id='inputGroupFile01'
        aria-describedby='inputGroupFileAddon01'
        onChange={async (e) => {
          const result = await upload(e.target.files[0], path)
          onUpload(result.key)
        }}
      />
      <label className='custom-file-label' htmlFor='inputGroupFile01'>
        Choose file
      </label>
    </div>
  )
}
