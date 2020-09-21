import API from '@aws-amplify/api'

export const getPromotion = async (id) => {
  return await API.get('pheesible-api', `/promotion/${id}`)
}

export const getPromotions = async () => {
  return await API.get('pheesible-api', '/promotion')
}

export const savePromotion = async (promotion) => {
  API.post('pheesible-api', '/promotion', { body: promotion })
}

export const getTemplates = async () => {
  return await API.get('pheesible-api', '/promotion/templates')
}

export const createPaymentIntent = async (amount) => {
  return await API.get('pheesible-api', `/billing/${amount}`)
}
