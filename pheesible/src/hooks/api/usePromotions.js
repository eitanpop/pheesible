import React from 'react'
import useApi from './useApi'
import { getPromotion, getPromotions } from '../../services/api'

export default ( ...args) => {
  return useApi(args.length ? getPromotion : getPromotions, ...args)
}
