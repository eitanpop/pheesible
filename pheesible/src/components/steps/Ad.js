import React from 'react'

import useError from '../../hooks/useError'
import Uploader from '../file/Uploader'
import ErrorMessage from '../ErrorMessage'
import CardTitle from '../wizard/CardTitle'
import CardSubTitle from '../wizard/CardSubTitle'
import HeaderSpacer from '../wizard/HeaderSpacer'
import FocusGroupSetting from '../wizard/FocusGroupSetting'

import facebookImg from '../wizard/img/facebook.png'
import instagramImg from '../wizard/img/instagram.png'

export default ({
  promotion,
  updatePromotion,
  isRequestingNextStep,
  stopRequestingNextStep,
  setIsNextStepConfirmed,
}) => {
  const updateAdOnPromotion = (key, value) => {
    const ad = { ...promotion.ad, [key]: value }
    updatePromotion('ad', ad)
  }

  const error = useError(
    isRequestingNextStep,
    stopRequestingNextStep,
    setIsNextStepConfirmed,
    (addError, setIsValid) => {
      if (!promotion.ad.text) {
        setIsValid(false)
        addError('text', 'Please add some text for the ad')
      }
    },
    [JSON.stringify(promotion)]
  )

  return (
    <div className='card'>
      <div className='card-body'>
        <CardTitle toolTip='This is a test tooltip'>Ad Set Up</CardTitle>{' '}
        <HeaderSpacer />
        <CardSubTitle>Basic Information</CardSubTitle>
        <div className='form-group'>
          <label htmlFor='title' className='fieldTitle'>
            Image
          </label>
          <div className='input-group'>
            <Uploader
              path='ad'
              onUpload={(result) => updateAdOnPromotion('image', result)}
              templateId={promotion.templateId}
              value={promotion.ad.image}
              clearFunction={() => updateAdOnPromotion('image', null)}
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='summary' className='fieldTitle'>
            Ad Text
          </label>
          <textarea
            className={`form-control ${error.text ? ' has-error ' : ''}`}
            id='tagLine'
            rows='6'
            onChange={(e) => updateAdOnPromotion('text', e.target.value)}
            value={promotion.ad.text || ''}></textarea>
          <ErrorMessage errorMessage={error.text} />
        </div>
        <div className='mt-4' />
        <hr stlye={{ width: '90%' }} />
        <CardSubTitle>Social Networks</CardSubTitle>
        <div className='mt-4'></div>
        <FocusGroupSetting
          img={facebookImg}
          name='Facebook'
          updateValue={(key, value) => {
            const facebook = { ...promotion.facebook, [key]: value }
            updatePromotion('facebook', facebook)
          }}
          getValue={(key) => promotion.facebook[key]}
          otherFocusGroup={{
            name: 'Instagram',
            img: instagramImg,
            updateValue: (toggledOn) => {
              const facebook = {
                ...promotion.facebook,
                includeInstagram: toggledOn,
              }
              updatePromotion('facebook', facebook)
            },
            getValue: (key) => promotion.facebook.includeInstagram,
          }}
        />
      </div>
    </div>
  )
}
