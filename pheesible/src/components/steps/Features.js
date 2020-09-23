import React from 'react'

import NameDescribe from '../TitleDescribe'

export default ({ promotion, updatePromotion, isValidating, setStepValid }) => {
  if (isValidating) {
    console.log('isValidating is true and setting currentStepValid to true')
    setStepValid(true)
  }
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
    </div>
  )
}
