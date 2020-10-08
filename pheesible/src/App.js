import React, { useState } from 'react'
import Amplify, { Hub } from 'aws-amplify'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import awsConfig from './aws-exports'
import AuthenticatorContainer from './components/auth/AuthenticatorContainer'
import PromotionContainer from './components/PromotionContainer'
import Header from './components/Header'
import { OrderedWizardSteps } from './constants'
import Wizard from './pages/Wizard'
import Purchase from './pages/Purchase'
import Campaigns from './pages/Campaigns'
import Site from './pages/Site'
import Home from './pages/Home'
import './App.css'

Amplify.configure(awsConfig)

Hub.listen('auth', (data) => {
  console.log('data.payload.event', data.payload.event)
})

const emptyPromotion = {
  stepNumber: OrderedWizardSteps.Templates.step,
  templateId: 1,
  fields: {},
  sellingPoints: [],
  features: [],
  promotionSettings: {},
  images: {},
  freeText: '',
  ad: {},
  facebook: {},
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)

function App() {
  const [promotion, setPromotion] = useState(emptyPromotion)

  return (
    <>
      <Router>
        <Switch>
          <Route path='/site/:id'>
            <Site />
          </Route>
          <Route>
            <div className='app h-100'>
              <AuthenticatorContainer>
                <Header />
                <PromotionContainer>
                  <Elements stripe={stripePromise}>
                    <Router>
                      <Switch>
                        <Route path='/wizard'>
                          <Wizard
                            promotion={promotion}
                            setPromotion={setPromotion}
                          />
                        </Route>
                        <Route path='/campaigns'>
                          <Campaigns setPromotion={setPromotion} />
                        </Route>
                        <Route path='/'>
                          <Home />
                        </Route>
                      </Switch>
                    </Router>
                  </Elements>
                </PromotionContainer>
              </AuthenticatorContainer>
            </div>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
