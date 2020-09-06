import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { OrderedWizardSteps, Template } from './constants'
import Wizard from './pages/Wizard'
import Purchase from './pages/Purchase'
import './App.css'

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
const stripePromise = loadStripe('pk_test_51HOTFtG17TXgNomVGAwxu5MYQm88Ya0JgFfSZOHkhqnuuaRVs7HTFTRWGeJ5yxQK5E9oJPBDSDRVDsMq5dulnvGf00jx3zh9bz')

function App() {
  const [promotion, setPromotion] = useState(emptyPromotion)
  return (
    <div className='app'>
      <div className='container-fluid'>
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
      </div>
    </div>
  )
}

export default App
