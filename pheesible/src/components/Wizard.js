import React, { useState } from 'react'

import { WizardSteps, Template } from '../constants.js'
import Templates from './Templates'
import Forms from './Forms'
import Preview from './Preview'

const getComponentByStep = (promotion, updatePromotion) => {
  const { stepNumber } = promotion

  switch (stepNumber) {
    case WizardSteps.Templates:
      return (
        <Templates promotion={promotion} updatePromotion={updatePromotion} />
      )
    case WizardSteps.Forms:
      return <Forms promotion={promotion} updatePromotion={updatePromotion} />
    default:
      throw Error('invalid step number')
  }
}

export default () => {
  const [promotion, setPromotion] = useState({
    stepNumber: WizardSteps.Templates,
    template: Template.Business,
    fields: [],
  })

  const updatePromotion = (key, val) => {
    setPromotion({ ...promotion, [key]: val })
  }

  const nextStep = () => {
    updatePromotion('stepNumber', promotion.stepNumber + 1)
  }

  const previousStep = () => {
    updatePromotion('stepNumber', promotion.stepNumber - 1)
  }

  return (
    <div className='row'>
      <div className='col-sm-3 right-shadow' style={{ zIndex: 100 }}>
        {getComponentByStep(promotion, updatePromotion)}
        <br />
        <div className='row pb-3'>
          <div className='col d-flex justify-content-center'>
            <button
              type='button'
              className='btn btn-primary'
              disabled={promotion.stepNumber === WizardSteps.Templates}
              onClick={() => previousStep()}>
              Back
            </button>
          </div>
          <div className='col d-flex justify-content-center'>
            <button
              type='button'
              className='btn btn-primary'
              disabled={promotion.stepNumber === WizardSteps.Forms}
              onClick={() => nextStep()}>
              Next
            </button>
          </div>
        </div>
      </div>
      <div
        className='col-sm-9 pl-3 pb-2  d-flex justify-content-center bg-light'
        style={{ height: '100vh' }}>
        <Preview promotion={promotion} />
      </div>
    </div>
  )
}
