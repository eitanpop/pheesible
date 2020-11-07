import React, { useState, useEffect } from 'react'
import Amplify, { Hub, Auth } from 'aws-amplify'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import awsConfig from './aws-exports'
import { getUserGroups } from './services/auth'
import AuthenticatorContainer from './components/auth/AuthenticatorContainer'
import Header from './components/Header'
import { OrderedWizardSteps } from './constants'
import Wizard from './pages/Wizard'
import Campaigns from './pages/Campaigns'
import Site from './pages/Site'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Report from './pages/Report'
import './App.css'

Amplify.configure(awsConfig)

Hub.listen('auth', (data) => {
  console.log('data.payload.event', data.payload.event)
})

const emptyPromotion = {
  stepNumber: OrderedWizardSteps.Templates.step,
  templateId: null,
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
  const [isAdmin, setIsAdmin] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  const updateAuthenticatedStatus = async () =>
    setIsAuthenticated(!!(await Auth.currentUserInfo()))
  useEffect(() => {
    updateAuthenticatedStatus()
  }, [])

  if (isAuthenticated === null) return <></>
  return (
    <>
      <Router>
        <Switch>
          <Route path='/site/:id' exact>
            <Site />
          </Route>

          <Route path='/' exact>
            <Header isAuthenticated={isAuthenticated} />
            <Home />
          </Route>
          <Route>
            <div className='app h-100'>
              <Elements stripe={stripePromise}>
                <Header isAuthenticated={isAuthenticated} />
                <AuthenticatorContainer
                  onAuthStateChanged={async (e) => {
                    console.log('e', e)
                    updateAuthenticatedStatus()
                    if (isAdmin === null) {
                      const userGroups = await getUserGroups()
                      setIsAdmin(userGroups && userGroups[0] === 'Admin')
                    }
                  }}>
                  <Switch>
                    <Route path='/wizard' exact>
                      <Wizard
                        promotion={promotion}
                        setPromotion={setPromotion}
                      />
                    </Route>
                    <Route path='/campaigns' exact>
                      <Campaigns setPromotion={setPromotion} />
                    </Route>
                    <Route path='/report/:id'>
                      <Report />
                    </Route>
                    <Route path='/admin' exact>
                      {isAdmin === null ? (
                        <div>Loading...</div>
                      ) : isAdmin ? (
                        <Admin />
                      ) : (
                        <div>Not Allowed!</div>
                      )}
                    </Route>
                    <Route path='/login' exact>
                      <Redirect to='/campaigns' />
                    </Route>
                  </Switch>
                </AuthenticatorContainer>
              </Elements>
            </div>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
