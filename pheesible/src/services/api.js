import axios from 'axios'

export const getPromotion = async (id) => {
  await axios.get(`${process.env.REACT_APP_API_URL}promotion/${id}`)
}

export const getPromotions = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}promotion`)
}

export const savePromotion = async (promotion) => {
  await axios.post(
    `${process.env.REACT_APP_API_URL}promotion`,
    JSON.stringify(promotion)
  )
}

export const createPaymentIntent = async (amount) => {
  await axios.get(`${process.env.REACT_APP_API_URL}/billing/${amount}`)
}
