import React, { useState } from 'react'
import Amplify, { Hub } from 'aws-amplify'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import awsConfig from './aws-exports'
import AuthenticatorContainer from './components/auth/AuthenticatorContainer'
import SignedInContainer from './components/auth/SignedInContainer'
import ApiContainer from './components/ApiContainer'
import { OrderedWizardSteps, Template } from './constants'
import Wizard from './pages/Wizard'
import Purchase from './pages/Purchase'
import Promotions from './pages/Promotions'
import './App.css'

import { put } from './services/storage'
Amplify.configure(awsConfig)

Hub.listen('auth', (data) => {
  console.log('data.payload.event', data.payload.event)
})

const emptyPromotion = {
  stepNumber: OrderedWizardSteps.Templates,
  template: Template.Business,
  fields: {},
  sellingPoints: {},
  features: {},
  promotionSettings: {},
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)

function App() {
  const [promotion, setPromotion] = useState(emptyPromotion)
  put()
  return (
    <div className='app'>
      <div className='container-fluid'>
        <AuthenticatorContainer>
          <SignedInContainer>
            <ApiContainer>
              <Router>
                <Switch>
                  <Route path='/wizard'>
                    <Wizard promotion={promotion} setPromotion={setPromotion} />
                  </Route>
                  <Route path='/purchase'>
                    <Elements stripe={stripePromise}>
                      <Purchase promotion={promotion} />
                    </Elements>
                  </Route>
                  <Route path='/promotions'>
                    <div>
                      <Promotions />
                    </div>
                  </Route>
                  <Route path='/'>
                    <div>
                      <Link to='/wizard'>Create a promotion</Link>
                    </div>
                  </Route>
                </Switch>
              </Router>
            </ApiContainer>
          </SignedInContainer>
        </AuthenticatorContainer>
      </div>
    </div>
  )
}

export default App
