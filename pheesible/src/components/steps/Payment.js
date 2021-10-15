import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Auth } from 'aws-amplify'
import { Modal, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import LoadingButton from '../LoadingButton'
import { savePromotion, createPaymentIntent } from '../../services/api'
import PaymentSummary from '../PaymentSummary'
import CardTitle from '../wizard/CardTitle'
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
  navigator
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [address, setAddress] = useState({})
  const history = useHistory()

  const createOptions = () => {
    return {
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          fontFamily: 'Open Sans, sans-serif',
          letterSpacing: '0.025em',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#c23d4b',
        },
      },
    }
  }

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

    const stripeResponse = await stripe.confirmCardPayment(
      paymentIntentResponse.secret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name:
              user.attributes.given_name + ' ' + user.attributes.family_name,
            email: user.attributes.email,
            address: {
              city: address.city,
              line1: address.address,
              postal_code: address.zip,
            },
          },
        },
        receipt_email: user.attributes.email,
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


          <PaymentSummary promotion={promotion} />
          <br />
          <CardTitle tooltip='The total amount owed'>ORDER DETAILS</CardTitle>
          <div className='order-details'>
            <table className='table table-borderless'>
              <tbody>
                <tr>
                  <td>Pheesible</td>
                  <td className='float-right'>$149.99</td>
                </tr>
                {promotion.facebook && promotion.facebook.isEnabled ? (
                  <tr>
                    <td>
                      Facebook{' '}
                      {promotion.facebook.includeInstagram
                        ? ' and Instagram'
                        : ''}
                    </td>
                    <td className='float-right'>
                      $
                      {promotion.facebook.budgetPerDayInDollars *
                        promotion.facebook.numberOfDays}
                    </td>
                  </tr>
                ) : (
                  ''
                )}

                <tr>
                  <td>
                    <strong>Total Amount</strong>
                  </td>
                  <td>
                    <strong className='float-right'>
                      $
                      {(
                        149.99 +
                        (promotion.facebook && promotion.facebook.isEnabled
                          ? promotion.facebook.budgetPerDayInDollars *
                          promotion.facebook.numberOfDays
                          : 0)
                      ).toFixed(2)}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr />
          <br />
          <CardTitle>BILLINGS DETAILS</CardTitle>

          <div className='form-group'>
            <label htmlFor='title' className='fieldTitle'>
              Address
            </label>
            <input
              className='form-control'
              id='address'
              placeholder='Address'
              onChange={(e) =>
                setAddress({ ...address, address: e.target.value })
              }
              value={address.address}
              maxLength='100'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='title' className='fieldTitle'>
              City
            </label>
            <input
              className='form-control'
              id='city'
              placeholder='City'
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              value={address.city}
              maxLength='100'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='title' className='fieldTitle'>
              Zipcode
            </label>
            <input
              className='form-control'
              id='zip'
              placeholder='Zipcode'
              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
              value={address.zip}
              maxLength='100'
            />
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <div className='pr-1 mt-4'>
              <CardElement options={CARD_OPTIONS} {...createOptions()} />
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
