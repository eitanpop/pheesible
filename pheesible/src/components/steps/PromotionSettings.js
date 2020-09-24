import React from 'react'

import FocusGroupsSetting from '../FocusGroupSetting'
import { FocusGroups } from '../../constants'

export default ({
  promotion,
  updatePromotion,
  isRequestingNextStep,
  stopRequestingNextStep,
  setIsNextStepConfirmed,
}) => {
  const updateSettingsOnPromotion = (adNetwork, key, value) => {
    const settings = {
      ...promotion.promotionSettings,
      [adNetwork]: { ...promotion.promotionSettings[adNetwork], [key]: value },
    }
    updatePromotion('promotionSettings', settings)
  }

  const getPromotionValue = (adNetwork, key) => {
    return (
      (promotion.promotionSettings[adNetwork] &&
        promotion.promotionSettings[adNetwork][key]) ||
      ''
    )
  }

  if (isRequestingNextStep) {
    console.log('isValidating is true and setting currentStepValid to true')
    setIsNextStepConfirmed(true)
  }

  return (
    <>
      <FocusGroupsSetting
        adNetwork={FocusGroups.facebook}
        updateSettingsOnPromotion={updateSettingsOnPromotion}
        getPromotionValue={getPromotionValue}
      />
      <FocusGroupsSetting
        adNetwork={FocusGroups.instagram}
        updateSettingsOnPromotion={updateSettingsOnPromotion}
        getPromotionValue={getPromotionValue}
      />

      <FocusGroupsSetting
        adNetwork={FocusGroups.twitter}
        updateSettingsOnPromotion={updateSettingsOnPromotion}
        getPromotionValue={getPromotionValue}
      />

      <FocusGroupsSetting
        adNetwork={FocusGroups.tiktok}
        updateSettingsOnPromotion={updateSettingsOnPromotion}
        getPromotionValue={getPromotionValue}
      />
    </>
  )
}
