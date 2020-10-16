import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Auth } from 'aws-amplify'
import { Modal, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import LoadingButton from '../LoadingButton'
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
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const signedInUser = await Auth.currentUserInfo()
    console.log('signedInUser', signedInUser)
    setIsLoading(true)
    setError(null)
    // Block native form submission.

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

    const stripeResponse = await stripe.confirmCardPayment(
      paymentIntentResponse.secret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Jenny Rosen',
          },
        },
        receipt_email: 'eitanpop@gmail.com',
      }
    )

    console.log('stripe response', stripeResponse)

    const { error, paymentIntent } = stripeResponse

    if (error) {
      setIsLoading(false)
      setError(error.message)
      console.log('[error]', error)
    } else if (paymentIntent.status) {
      console.log('[status]', paymentIntent.status)
      setIsLoading(false)
      setSuccess(true)
    }
  }
  return (
    <>
      <Modal show={success}>
        <Modal.Header>
          <Modal.Title>Payment Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Payment Success! Would you like to see your campaigns?{' '}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            onClick={() => {
              history.push('/campaigns')
            }}>
            Go!
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='card'>
        <div className='card-body'>
          {error && (
            <div class='alert alert-danger' role='alert'>
              {error}
            </div>
          )}

          <CardSubTitle toolTip='This is a test tooltip'>Purchase</CardSubTitle>
          <HeaderSpacer />
          <PaymentSummary promotion={promotion} />
          <form onSubmit={handleSubmit}>
            <div className='pr-1 mt-4'>
              <CardElement options={CARD_OPTIONS} />
              <LoadingButton
                className='btn btn-primary mt-4 btn-block'
                type='submit'
                disabled={!stripe}
                isLoading={isLoading}>
                Pay
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
