import React, { useState } from 'react'
import Amplify, { Auth, Hub } from 'aws-amplify'
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
} from '@aws-amplify/ui-react'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import awsConfig from './aws-exports'
import AmplifyTheme from './components/auth/theme'
import { OrderedWizardSteps, Template } from './constants'
import Wizard from './pages/Wizard'
import Purchase from './pages/Purchase'
import './App.css'

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
  const [authState, setAuthState] = useState(null)

  return (
    <div className='app'>
      <div className='container-fluid'>
        <AmplifyAuthenticator userNameAlias='email'>
          <AmplifySignUp
            slot='sign-up'
            usernameAlias='email'
            formFields={[
              {
                type: 'email',
                label: 'Email / Username',
                required: true,
              },
              {
                type: 'password',

                required: true,
              },
              {
                type: 'given_name',
                label: 'First Name',
                placeholder: 'Enter your first name',
                required: true,
              },
              {
                type: 'family_name',
                label: 'Last Name',
                placeholder: 'Enter your last name',
                required: true,
              },
              {
                type: 'phone_number',
                label: 'Custom Phone Label',
                placeholder: 'custom Phone placeholder',
                required: false,
              },
            ]}
          />
          <AmplifySignIn slot='sign-in' usernameAlias='email' />
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
              <Route path='/'>
                <div>
                  <Link to='/wizard'>Create a promotion</Link>
                </div>
              </Route>
            </Switch>
          </Router>
        </AmplifyAuthenticator>
      </div>
    </div>
  )
}

export default App
