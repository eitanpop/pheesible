import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Auth } from 'aws-amplify'

import { savePromotion, createPaymentIntent } from '../../services/api'
import PaymentSummary from '../PaymentSummary'
import CardSubTitle from '../wizard/CardSubTitle'
import HeaderSpacer from '../wizard/HeaderSpacer'

const CARD_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
}

export default ({
  promotion,
  updatePromotion,
  isRequestingNextStep,
  stopRequestingNextStep,
  setIsNextStepConfirmed,
}) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    const promotionResponse = await savePromotion(promotion)
    console.log('promotionResponse', promotionResponse)

    const paymentIntentResponse = await createPaymentIntent({
      ...promotion,
      id: promotionResponse.id,
    })

    // const response = await createPaymentIntent(getTotalCharge(promotion))

    console.log(paymentIntentResponse)

    const user = await Auth.currentUserInfo()

    console.log('user', user)

    const stripeResponse = await stripe.confirmCardPayment(paymentIntentResponse.secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      },
      receipt_email:'eitanpop@gmail.com',
    })

    console.log('stripe response', stripeResponse)

    const { error, paymentIntent } = stripeResponse

    if (error) {
      console.log('[error]', error)
    } else {
      console.log('[status]', paymentIntent.status)
    }
  }
  return (
    <div className='card'>
      <div className='card-body'>
        <CardSubTitle toolTip='This is a test tooltip'>Purchase</CardSubTitle>
        <HeaderSpacer />
        <PaymentSummary promotion={promotion} />
        <form onSubmit={handleSubmit}>
          <div className='pr-1 mt-4'>
            <CardElement options={CARD_OPTIONS} />
            <button
              className='btn btn-primary mt-4 btn-block'
              type='submit'
              disabled={!stripe}>
              Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
