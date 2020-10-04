import React, { useState, useEffect } from 'react'

import { upload, remove } from '../../services/storage'
import uploadIcon from './img/upload-icon.jpg'

export default ({ path = '', onUpload, templateId, value, clearFunction }) => {
  const [now, setNow] = useState(0)
  const [total, setTotal] = useState(null)
  const [hideProgress, setHideProgress] = useState(true)

  useEffect(() => {
    if (now === 100) {
      setTimeout(() => setHideProgress(true), 1000)
    } else if (now !== 0) {
      if (hideProgress) setHideProgress(false)
    }
  }, [now])
  return (
    <>
      <p>
        <small>Upload your file in format PDF, JPEG, PNG. Maximum 5MB</small>
      </p>
      <div class='file_upload'>
        <img src={uploadIcon} alt='' />
        <input
          type='file'
          onClick={(e) => {
            setNow(0)
            setTotal(null)
            e.target.value = null
          }}
          onChange={async (e) => {
            console.log('uploading', e.target.value)
            const result = await upload(
              e.target.files[0],
              `${templateId}${templateId ? '/' : ''}${path}`,
              (progress) => {
                if (!total) setTotal(progress.total)
                console.log(`Uploaded: ${progress.loaded}/${progress.total}`)
                console.log(
                  'percent uploaded',
                  (progress.loaded * 100) / progress.total
                )
                setNow((progress.loaded * 100) / progress.total)
              }
            )
            onUpload(result.key)
          }}
        />
      </div>

      {value ? (
        <>
          <span>
            {value}
            <a
              style={{ fontWeight: 'bold' }}
              href='#'
              onClick={(e) => {
                clearFunction()
                remove(value)
              }}
              className='btn btn-link'>
              X
            </a>
          </span>{' '}
        </>
      ) : (
        ''
      )}
      {hideProgress ? (
        ''
      ) : (
        <div class='progress' style={{ width: '100%' }}>
          <div
            class='progress-bar progress-bar-striped bg-primary'
            role='progressbar'
            style={{ width: now + '%' }}
            aria-valuenow={now}
            aria-valuemin='0'
            aria-valuemax='100'></div>
        </div>
      )}
    </>
  )
}
