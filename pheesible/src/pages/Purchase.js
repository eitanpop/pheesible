import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'

import PaymentSummary from '../components/PaymentSummary'
import getTotalCharge from '../selectors/getTotalCharge'
import Preview from '../components/steps/Preview'

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

export default ({ promotion }) => {
  const stripe = useStripe()
  const elements = useElements()
  console.log('promotion', promotion)

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    console.log(
      'process.env.REACT_APP_BILLING_URL',
      process.env.REACT_APP_BILLING_URL
    )
    const response = await axios.get(
      `${process.env.REACT_APP_BILLING_URL}/${getTotalCharge(promotion)}`
    )
    console.log(response)

    const stripeResponse = await stripe.confirmCardPayment(response.data, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      },
    })

    console.log('stripe response', stripeResponse)

    const { error, status } = stripeResponse.paymentIntent

    if (error) {
      console.log('[error]', error)
    } else {
      console.log('[status]', status)
    }
  }

  return (
    <div>
      <div className='row'>
        <div className='col-sm-3 right-shadow' style={{ zIndex: 100 }}>
          <PaymentSummary promotion={promotion} />
          <form onSubmit={handleSubmit}>
            <div className='pr-1 mt-4'>
              <CardElement options={CARD_OPTIONS} />
              <button
                className='btn btn-primary mt-4'
                type='submit'
                disabled={!stripe}>
                Pay
              </button>
            </div>
          </form>
        </div>

        <div
          className='col-sm-9 pl-3 pb-2  d-flex justify-content-center bg-light'
          style={{ height: '100vh' }}>
          <Preview promotion={promotion} />
        </div>
      </div>
    </div>
  )
}