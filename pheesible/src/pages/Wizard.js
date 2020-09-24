import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { OrderedWizardSteps } from '../constants.js'
import Templates from '../components/steps/Templates'
import BasicInformation from '../components/steps/BasicInformation'
import Preview from '../components/preview/Preview'
import AdPreview from '../components/ads/AdPreview'
import SellingPoints from '../components/steps/SellingPoints'
import Features from '../components/steps/Features'
import PromotionSettings from '../components/steps/PromotionSettings'
import ImageUpload from '../components/steps/ImageUpload'
import BottomText from '../components/steps/BottomText'
import Ad from '../components/steps/Ad'

import { getUserCognitoIdentityPoolId } from '../services/auth'

// we pass 'setIsValidating' to stop the wizard from proceeding to next step. This happens when there were errors and the user wants to fix them and click next again
const getComponentByStep = (
  promotion,
  updatePromotion,
  isValidating,
  setCurrentStepValid,
  setIsValidating
) => {
  const { stepNumber } = promotion

  //console.log('stepNumber', stepNumber)

  let component = null

  switch (stepNumber) {
    case OrderedWizardSteps.Templates:
      component = <Templates />
      break
    case OrderedWizardSteps.BasicInformation:
      component = <BasicInformation />
      break
    case OrderedWizardSteps.SellingPoints:
      component = <SellingPoints />
      break
    case OrderedWizardSteps.Features:
      component = <Features />
      break
    case OrderedWizardSteps.ImageUpload:
      component = <ImageUpload />
      break
    case OrderedWizardSteps.BottomText:
      component = <BottomText />
      break
    case OrderedWizardSteps.Ad:
      component = <Ad />
      break
    case OrderedWizardSteps.PromotionSettings:
      component = <PromotionSettings />
      break

    default:
      throw Error('invalid step number')
  }

  return React.cloneElement(component, {
    promotion,
    updatePromotion,
    isValidating,
    setCurrentStepValid,
    setIsValidating,
  })
}

export default ({ promotion, setPromotion }) => {
  const [currentStepValid, setCurrentStepValid] = useState(false)
  const [isValidating, setIsValidating] = useState(false)

  const updatePromotion = (key, val) => {
    setPromotion({ ...promotion, [key]: val })
  }
  const [component, setComponent] = useState(
    getComponentByStep(
      promotion,
      updatePromotion,
      isValidating,
      setCurrentStepValid,
      setIsValidating
    )
  )

  useEffect(() => {
    const updateIdentityId = async () => {
      const identityId = await getUserCognitoIdentityPoolId()
      setPromotion({ ...promotion, identityId })
    }
    updateIdentityId()
  }, [])

  // gets the component according to what step we are on
  useEffect(() => {
    setComponent(
      getComponentByStep(
        promotion,
        updatePromotion,
        isValidating,
        setCurrentStepValid,
        setIsValidating
      )
    )
  }, [JSON.stringify(promotion), isValidating])

  useEffect(() => {
    console.log(
      'currentStepValid in currentStepValid useEffect',
      currentStepValid
    )
    if (currentStepValid) {
      updatePromotion('stepNumber', promotion.stepNumber + 1)
    }
    setCurrentStepValid(false)
    setIsValidating(false)
  }, [currentStepValid])

  const nextStep = () => {
    // start the validation process, if the process of validating is true and the child component set currentStepValid, we go to next step
    setIsValidating(true)
  }

  const previousStep = () => {
    updatePromotion('stepNumber', promotion.stepNumber - 1)
  }

  return (
    <div className='row'>
      <div className='col-sm-3 right-shadow' style={{ zIndex: 100 }}>
        {component}
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
      <div className='col-sm-9 pl-3 pb-2  d-flex justify-content-center bg-light'>
        {promotion.stepNumber !== OrderedWizardSteps.Ad ? (
          <Preview promotion={promotion} isLive={false} />
        ) : (
          <AdPreview promotion={promotion} />
        )}
      </div>
    </div>
  )
}
