import React from 'react'

import useError from '../../hooks/useError'
import NameDescribe from '../TitleDescribe'
import ErrorMessage from '../ErrorMessage'

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
    <div>
      <h1>Selling Points</h1>
      <NameDescribe
        sellingPoint={promotion.sellingPoints[0] || {}}
        onSellingPointChange={(e) => {
          console.log('e', e)
          updatePromotion(
            'sellingPoints',
            Object.assign([], promotion.sellingPoints, { 0: e })
          )
        }}
      />
      <hr stlye={{ width: '90%' }} />

      <br />
      <br />
      <hr stlye={{ width: '90%' }} />

      <NameDescribe
        sellingPoint={promotion.sellingPoints[1] || {}}
        onSellingPointChange={(e) => {
          console.log('e', e)
          updatePromotion(
            'sellingPoints',
            Object.assign([], promotion.sellingPoints, { 1: e })
          )
        }}
      />

      <br />
      <br />
      <hr stlye={{ width: '90%' }} />

      <NameDescribe
        sellingPoint={promotion.sellingPoints[2] || {}}
        onSellingPointChange={(e) => {
          console.log('e', e)
          updatePromotion(
            'sellingPoints',
            Object.assign([], promotion.sellingPoints, { 2: e })
          )
        }}
      />
      <ErrorMessage errorMessage={error.global} />
      <hr stlye={{ width: '90%' }} />
    </div>
  )
}
