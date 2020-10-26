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

      if (
        promotion.facebook &&
        promotion.facebook.isEnabled &&
        !promotion.facebook.numberOfDays
      ) {
        setIsValid(false)
        addError(
          'numberOfDays',
          'Please add number of days to run the campaign'
        )
      }

      if (
        promotion.facebook &&
        promotion.facebook.isEnabled &&
        !promotion.facebook.budgetPerDayInDollars
      ) {
        setIsValid(false)
        addError('budgetPerDayInDollars', 'Please add a budget per day in USD')
      }

      if (
        promotion.facebook &&
        promotion.facebook.isEnabled &&
        promotion.facebook.budgetPerDayInDollars > 200
      ) {
        setIsValid(false)
        addError('budgetPerDayInDollars', 'Budget per day in USD must be less than $200')
      }

      if (
        promotion.facebook &&
        promotion.facebook.numberOfDays &&
        promotion.facebook.numberOfDays < 2
      ) {
        setIsValid(false)
        addError('days', 'Campaign length must be longer than a day')
      }
      if (
        promotion.facebook &&
        promotion.facebook.isEnabled &&
        promotion.facebook.numberOfDays >= 25
      ) {
        setIsValid(false)
        addError('numberOfDays', 'Number of days should be less than 25')
      }
    },
    [JSON.stringify(promotion)]
  )

  return (
    <div className='card'>
      <div className='card-body'>
        <CardTitle
          tooltip='The banner image and text that will redirect to the landing page. The template comes with an optimized and engaging image but you have the liberty to add your own.
        The image and text will update the adjacent preview in real time.'>
          Ad Set Up
        </CardTitle>{' '}
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
            value={promotion.ad.text || ''}
            maxLength='90'></textarea>
          <ErrorMessage errorMessage={error.text} />
        </div>
        <div className='mt-4' />
        <hr stlye={{ width: '90%' }} />
        <CardTitle
          tooltip='The focus groups are the platforms that Pheesible will publish the ad to in order to attract visitors to your landing page. 
        You have the option to bypass publishing to external focus groups altogether and create the landing page for personal use.'>
          Focus Groups
        </CardTitle>
        <div className='mt-4'></div>
        <FocusGroupSetting
          img={facebookImg}
          name='Facebook'
          error={error}
          updateValue={(key, value) => {
            const facebook = { ...promotion.facebook, [key]: value }
            updatePromotion('facebook', facebook)
          }}
          getValue={(key) => promotion.facebook && promotion.facebook[key]}
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
            getValue: (key) =>
              promotion.facebook && promotion.facebook.includeInstagram,
          }}
        />
      </div>
    </div>
  )
}
