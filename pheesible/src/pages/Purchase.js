import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

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

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement)

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    if (error) {
      console.log('[error]', error)
    } else {
      console.log('[PaymentMethod]', paymentMethod)
    }
  }

  return (
    <div>
      <div className='row'>
        <div className='col-sm-3 right-shadow' style={{ zIndex: 100 }}>
          <form onSubmit={handleSubmit}>
            <div className="pr-1 mt-4">
              <CardElement options={CARD_OPTIONS} />
              <button class='btn btn-primary mt-4' type='submit' disabled={!stripe}>
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
