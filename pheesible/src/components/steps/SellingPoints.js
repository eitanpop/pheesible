import React from 'react'

import NameDescribe from '../TitleDescribe'

export default ({
  promotion,
  updatePromotion,
  isRequestingNextStep,
  stopRequestingNextStep,
  setIsNextStepConfirmed,
}) => {
  if (isRequestingNextStep) {
    console.log('isValidating is true and setting currentStepValid to true')
    setIsNextStepConfirmed(true)
  }

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

      <hr stlye={{ width: '90%' }} />
    </div>
  )
}
