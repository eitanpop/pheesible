import React, { useEffect } from 'react'

import { get } from '../services/storage'

export default (key, identityId, setter) => {
  useEffect(() => {
    const getImage = async () => {
      if (!key) {
        setter(null)
        return
      }
      setter(await get(key, identityId))
    }
    getImage()
  }, [key, identityId, setter])
}
