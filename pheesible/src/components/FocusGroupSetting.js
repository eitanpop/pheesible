import React from 'react'

export default ({
  adNetwork,
  updateSettingsOnPromotion,
  getPromotionValue,
}) => {
  return (
    <>
      <div className='form-group'>
        <h3>{adNetwork}</h3>
      </div>
      <div className='form-group'>
        <label htmlFor='title'>Length in days to run the promotion</label>
        <input
          className='form-control'
          id='title'
          onChange={(e) =>
            updateSettingsOnPromotion(
              adNetwork,
              'lengthInDaysOfPromotion',
              e.target.value
            )
          }
          value={getPromotionValue(adNetwork, 'lengthInDaysOfPromotion')}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='title'>Budget per day</label>
        <input
          className='form-control'
          id='title'
          onChange={(e) =>
            updateSettingsOnPromotion(
              adNetwork,
              'budgetPerDayInDollars',
              e.target.value
            )
          }
          value={getPromotionValue(adNetwork, 'budgetPerDayInDollars')}
        />
      </div>
    </>
  )
}
