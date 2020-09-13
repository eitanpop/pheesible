import React from 'react'

import AdNetworkSetting from '../AdNetworkSetting'
import { AdNetworks } from '../../constants'

export default ({ promotion, updatePromotion }) => {
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

  return (
    <>
      <AdNetworkSetting
        adNetwork={AdNetworks.facebook}
        updateSettingsOnPromotion={updateSettingsOnPromotion}
        getPromotionValue={getPromotionValue}
      />
      <AdNetworkSetting
        adNetwork={AdNetworks.instagram}
        updateSettingsOnPromotion={updateSettingsOnPromotion}
        getPromotionValue={getPromotionValue}
      />

      <AdNetworkSetting
        adNetwork={AdNetworks.twitter}
        updateSettingsOnPromotion={updateSettingsOnPromotion}
        getPromotionValue={getPromotionValue}
      />

      <AdNetworkSetting
        adNetwork={AdNetworks.tiktok}
        updateSettingsOnPromotion={updateSettingsOnPromotion}
        getPromotionValue={getPromotionValue}
      />
    </>
  )
}
