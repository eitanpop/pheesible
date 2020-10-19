import API from '@aws-amplify/api'
import axios from 'axios'

const apiName = 'pheesible-rest'

export const getPromotion = async (id) => {
  return await API.get(apiName, `/promotion/${id}`)
}

export const getPublicPromotion = async (id) => {
  return await API.get(apiName, `/promotion/public/${id}`)
}

export const getPromotions = async () => {
  return await API.get(apiName, '/promotion')
}

export const savePromotion = async (promotion) => {
  return await API.post(apiName, '/promotion', { body: promotion })
}

export const deletePromotion = async (id) => {
  return await API.del(apiName, `/promotion/${id}`)
}

export const getReport = async (id) => {
  return await API.get(apiName, `/promotion/report/${id}`)
}

export const getTemplates = async () => {
  return await API.get(apiName, '/promotion/templates')
}

export const createPaymentIntent = async (promotion) => {
  return await API.post(apiName, `/billing`, { body: promotion })
}

export const saveLead = async (promotionId, lead) => {
  console.log('lead', { promotionId, ...lead })
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/promotion/lead`,
    JSON.stringify({ promotionId, ...lead })
  )
}
