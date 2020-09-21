import API from '@aws-amplify/api'
import axios from 'axios'

const apiName = 'pheesible-rest'

export const getPromotion = async (id) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/promotion/${id}`)
}

export const getPromotions = async () => {
  return await API.get(apiName, '/promotion')
}

export const savePromotion = async (promotion) => {
  API.post(apiName, '/promotion', { body: promotion })
}

export const getTemplates = async () => {
  return await API.get(apiName, '/promotion/templates')
}

export const createPaymentIntent = async (amount) => {
  return await API.get(apiName, `/billing/${amount}`)
}
