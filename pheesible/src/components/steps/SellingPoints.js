import React from 'react'

import useError from '../../hooks/useError'
import NameDescribe from '../TitleDescribe'
import ErrorMessage from '../ErrorMessage'

import CardSubTitle from '../wizard/CardSubTitle'
import HeaderSpacer from '../wizard/HeaderSpacer'

export default ({
  promotion,
  updatePromotion,
  isRequestingNextStep,
  stopRequestingNextStep,
  setIsNextStepConfirmed,
}) => {
  const error = useError(
    isRequestingNextStep,
    stopRequestingNextStep,
    setIsNextStepConfirmed,
    (addError, setIsValid) => {
      if (!promotion.sellingPoints.length) {
        setIsValid(false)
        addError('global', 'Please add at least one selling point')
      }
    },
    [JSON.stringify(promotion)]
  )

  return (
    <div className='card'>
      <div className='card-body'>
        <CardSubTitle toolTip='This is a test tooltip'>
          Selling Points
        </CardSubTitle>{' '}
        <HeaderSpacer />
        <NameDescribe
          titleLabelText='Selling Point 1'
          sellingPoint={promotion.sellingPoints[0] || {}}
          onSellingPointChange={(e) => {
            console.log('e', e)
            updatePromotion(
              'sellingPoints',
              Object.assign([], promotion.sellingPoints, { 0: e })
            )
          }}
        />
        <div className='mt-5' />
        <hr stlye={{ width: '90%' }} />
        <NameDescribe
          titleLabelText='Selling Point 2'
          sellingPoint={promotion.sellingPoints[1] || {}}
          onSellingPointChange={(e) => {
            console.log('e', e)
            updatePromotion(
              'sellingPoints',
              Object.assign([], promotion.sellingPoints, { 1: e })
            )
          }}
        />
        <div className='mt-5' />
        <hr stlye={{ width: '90%' }} />
        <NameDescribe
          titleLabelText='Selling Point 3'
          sellingPoint={promotion.sellingPoints[2] || {}}
          onSellingPointChange={(e) => {
            console.log('e', e)
            updatePromotion(
              'sellingPoints',
              Object.assign([], promotion.sellingPoints, { 2: e })
            )
          }}
        />
        {error.global && (
          <div class='alert alert-danger' role='alert'>
            {error.global}
          </div>
        )}
      </div>
    </div>
  )
}
