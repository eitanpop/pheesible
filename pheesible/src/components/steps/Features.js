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
      if (!promotion.features.length) {
        setIsValid(false)
        addError('global', 'Please add at least one feature')
      }
    },
    [JSON.stringify(promotion)]
  )

  return (
    <div>
      <h1>Features</h1>
      <NameDescribe
        sellingPoint={promotion.features[0] || {}}
        onSellingPointChange={(e) => {
          console.log('e', e)
          updatePromotion(
            'features',
            Object.assign([], promotion.features, { 0: e })
          )
        }}
      />
      <hr stlye={{ width: '90%' }} />

      <br />
      <br />
      <hr stlye={{ width: '90%' }} />

      <NameDescribe
        sellingPoint={promotion.features[1] || {}}
        onSellingPointChange={(e) => {
          console.log('e', e)
          updatePromotion(
            'features',
            Object.assign([], promotion.features, { 1: e })
          )
        }}
      />

      <br />
      <br />
      <hr stlye={{ width: '90%' }} />

      <NameDescribe
        sellingPoint={promotion.features[2] || {}}
        onSellingPointChange={(e) => {
          console.log('e', e)
          updatePromotion(
            'features',
            Object.assign([], promotion.features, { 2: e })
          )
        }}
      />

      <hr stlye={{ width: '90%' }} />
      <ErrorMessage errorMessage={error.global} />
    </div>
  )
}
