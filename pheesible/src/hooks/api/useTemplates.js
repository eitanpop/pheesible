import React from 'react'
import useApi from './useApi'
import { getTemplates } from '../../services/api'

export default () => {
  return useApi(getTemplates)
}
