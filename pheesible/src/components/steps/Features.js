import React from 'react'

import NameDescribe from '../TitleDescribe'

export default ({ promotion, updatePromotion }) => {
  return (
    <div>
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
