import React from 'react'

import { upload, remove } from '../../services/storage'
import uploadIcon from './img/upload-icon.jpg'

export default ({ path = '', onUpload, templateId, value, clearFunction }) => {
  return (
    <>
      <p>
        <small>Upload your file in format PDF, JPEG, PNG. Maximum 5MB</small>
      </p>
      <div class='file_upload'>
        <img src={uploadIcon} alt='' />
        <input
          type='file'
          id='inputLogo2'
          onChange={async (e) => {
            const result = await upload(
              e.target.files[0],
              `${templateId}${templateId ? '/' : ''}${path}`
            )
            onUpload(result.key)
          }}
        />
      </div>
      {value ? (
        <>
          <span>{value}</span>{' '}
          <span style={{ textAlign: 'right' }}>
            <button
              onClick={(e) => {
                clearFunction()
                remove(value)
              }}
              className='btn btn-link'>
              <sm>X</sm>
            </button>
          </span>
        </>
      ) : (
        ''
      )}
    </>
  )
  /*
  return (
    <div className='custom-file'>
      <input
        type='file'
        className='custom-file-input'
        id='inputGroupFile01'
        aria-describedby='inputGroupFileAddon01'
        onChange={async (e) => {
          const result = await upload(
            e.target.files[0],
            `${templateId}${templateId ? '/' : ''}${path}`
          )
          onUpload(result.key)
        }}
      />
      <label className='custom-file-label' htmlFor='inputGroupFile01'>
        Choose file
      </label>
    </div>
  )*/
}
