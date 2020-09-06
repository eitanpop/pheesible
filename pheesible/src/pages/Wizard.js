import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { OrderedWizardSteps, Template } from '../constants.js'
import Templates from '../components/steps/Templates'
import BasicInformation from '../components/steps/BasicInformation'
import Preview from '../components/steps/Preview'
import SellingPoints from '../components/steps/SellingPoints'
import Features from '../components/steps/Features'
import PromotionSettings from '../components/steps/PromotionSettings'

const getComponentByStep = (promotion, updatePromotion) => {
  const { stepNumber } = promotion

  switch (stepNumber) {
    case OrderedWizardSteps.Templates:
      return (
        <Templates promotion={promotion} updatePromotion={updatePromotion} />
      )
    case OrderedWizardSteps.BasicInformation:
      return (
        <BasicInformation
          promotion={promotion}
          updatePromotion={updatePromotion}
        />
      )
    case OrderedWizardSteps.SellingPoints:
      return (
        <SellingPoints
          promotion={promotion}
          updatePromotion={updatePromotion}
        />
      )
    case OrderedWizardSteps.Features:
      return (
        <Features promotion={promotion} updatePromotion={updatePromotion} />
      )
    case OrderedWizardSteps.PromotionSettings:
      return (
        <PromotionSettings
          promotion={promotion}
          updatePromotion={updatePromotion}
        />
      )
    default:
      throw Error('invalid step number')
  }
}

export default ({ promotion, setPromotion }) => {
  console.log('promotion', promotion)

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
              disabled={promotion.stepNumber === OrderedWizardSteps.Templates}
              onClick={() => previousStep()}>
              Back
            </button>
          </div>
          {promotion.stepNumber === OrderedWizardSteps.PromotionSettings ? (
            <div className='col d-flex justify-content-center'>
              <Link className='btn btn-primary' to='purchase'>
                Purchase
              </Link>
            </div>
          ) : (
            <div className='col d-flex justify-content-center'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => nextStep()}>
                Next
              </button>
            </div>
          )}
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
