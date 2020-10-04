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
      if (!promotion.features.length) {
        setIsValid(false)
        addError('global', 'Please add at least one feature')
      }
    },
    [JSON.stringify(promotion)]
  )

  return (
    <div className='card'>
      <div className='card-body'>
        <CardSubTitle>Features</CardSubTitle>
        <HeaderSpacer />
        <NameDescribe
          titleLabelText='Feature 1'
          sellingPoint={promotion.features[0] || {}}
          onSellingPointChange={(e) => {
            console.log('e', e)
            updatePromotion(
              'features',
              Object.assign([], promotion.features, { 0: e })
            )
          }}
        />

        <div style={{ marginTop: '2rem' }} />

        <hr stlye={{ width: '90%' }} />

        <NameDescribe
          titleLabelText='Feature 2'
          sellingPoint={promotion.features[1] || {}}
          onSellingPointChange={(e) => {
            console.log('e', e)
            updatePromotion(
              'features',
              Object.assign([], promotion.features, { 1: e })
            )
          }}
        />

        <div style={{ marginTop: '2rem' }} />

        <hr stlye={{ width: '90%' }} />

        <NameDescribe
          titleLabelText='Feature 3'
          sellingPoint={promotion.features[2] || {}}
          onSellingPointChange={(e) => {
            console.log('e', e)
            updatePromotion(
              'features',
              Object.assign([], promotion.features, { 2: e })
            )
          }}
        />
        <div style={{ marginTop: '2rem' }} />

        <hr stlye={{ width: '90%' }} />

        <NameDescribe
          titleLabelText='Feature 4'
          sellingPoint={promotion.features[3] || {}}
          onSellingPointChange={(e) => {
            console.log('e', e)
            updatePromotion(
              'features',
              Object.assign([], promotion.features, { 3: e })
            )
          }}
        />

        <ErrorMessage errorMessage={error.global} />
      </div>
    </div>
  )
}
