import React from 'react'

export default ({ promotion, updatePromotion }) => {
  const updateSettingsOnPromotion = (key, value) => {
    const settings = { ...promotion.promotionSettings, [key]: value }
    updatePromotion('promotionSettings', settings)
  }

  const { lengthInDaysOfPromotion, budgetPerDayInDollars } = promotion.promotionSettings

  return (
    <>
      <div className='form-group'>
        <label htmlFor='title'>Length in days to run the promotion</label>
        <input
          className='form-control'
          id='title'
          onChange={(e) => updateSettingsOnPromotion('lengthInDaysOfPromotion', e.target.value)}
          value={lengthInDaysOfPromotion || ''}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='title'>Budget per day</label>
        <input
          className='form-control'
          id='title'
          onChange={(e) => updateSettingsOnPromotion('budgetPerDayInDollars', e.target.value)}
          value={budgetPerDayInDollars || ''}
        />
      </div>
    </>
  )
}
