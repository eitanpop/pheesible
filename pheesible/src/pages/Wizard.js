import React, { useEffect, useState, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import html2canvas from 'html2canvas'

import { upload } from '../services/storage'
import { useUnload } from '../hooks/useUnload'
import { OrderedWizardSteps } from '../constants.js'
import StepLine from '../components/wizard/steps'
import Templates from '../components/steps/Templates'
import BasicInformation from '../components/steps/BasicInformation'
import Preview from '../components/preview/Preview'
import AdPreview from '../components/ads/AdPreview'
import SellingPoints from '../components/steps/SellingPoints'
import Features from '../components/steps/Features'
import Payment from '../components/steps/Payment'
import Terms from '../components/steps/Terms'
import LoadingButton from '../components/LoadingButton'

import ImageUpload from '../components/steps/ImageUpload'
import Ad from '../components/steps/Ad'

import { getUserCognitoIdentityPoolId } from '../services/auth'
import { savePromotion } from '../services/api'
import '../styles/wizard.css'

// we pass 'setIsValidating' to stop the wizard from proceeding to next step. This happens when there were errors and the user wants to fix them and click next again
const getComponentByStep = (
  promotion,
  updatePromotion,
  isRequestingNextStep,
  setIsRequestingNextStep,
  setIsNextStepConfirmed
) => {
  const { stepNumber } = promotion

  const stopRequestingNextStep = () => {
    setIsRequestingNextStep(false)
  }

  //console.log('stepNumber', stepNumber)

  let component = null

  switch (stepNumber) {
    case OrderedWizardSteps.Templates.step:
      component = <Templates />
      break
    case OrderedWizardSteps.BasicInformation.step:
      component = <BasicInformation />
      break
    case OrderedWizardSteps.SellingPoints.step:
      component = <SellingPoints />
      break
    case OrderedWizardSteps.Features.step:
      component = <Features />
      break
    case OrderedWizardSteps.ImageUpload.step:
      component = <ImageUpload />
      break
    case OrderedWizardSteps.Ad.step:
      component = <Ad />
      break
    case OrderedWizardSteps.Terms.step:
      component = <Terms />
      break

    case OrderedWizardSteps.Payment.step:
      component = <Payment />
      break

    default:
      throw Error('invalid step number')
  }

  return React.cloneElement(component, {
    promotion,
    updatePromotion,
    isRequestingNextStep,
    stopRequestingNextStep,
    setIsNextStepConfirmed,
  })
}

export default ({ promotion, setPromotion }) => {
  useUnload((e) => {
    e.preventDefault()
    e.returnValue = 'Changes you made may not be saved.'
  })

  const imageElement = useRef(null)
  const [isRequestingNextStep, setIsRequestingNextStep] = useState(false)
  const [isNextStepConfirmed, setIsNextStepConfirmed] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(
    !!localStorage.getItem('wolp')
  )
  const [isLoading, setIsLoading] = useState(false)

  console.log('promotion', promotion)

  const updatePromotion = (key, val) => {
    setPromotion({ ...promotion, [key]: val })
  }

  const saveAndContinue = (aPromotion) => {
    savePromotion(aPromotion).then((x) => {
      localStorage.setItem('wolp', '1')
      setPromotion({
        ...aPromotion,
        id: parseInt(x.id),
        stepNumber: aPromotion.stepNumber + 1,
      })
      setIsLoading(false)
    })
  }

  const handleImageSave = async () => {
    console.log('saving image')
    const canvas = await html2canvas(imageElement.current, {
      scale: 2,
      dpi: 200,
    })
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (blob === null) return
        const templateId = promotion.templateId
        const result = await upload(blob, `${templateId}/ad`)
        console.log('result', result)
        const ad = { ...promotion.ad, imageText: '', image: result.key }

        resolve(ad)
      })
    })
  }

  const [component, setComponent] = useState(
    getComponentByStep(
      promotion,
      updatePromotion,
      isRequestingNextStep,
      (e) => {
        setIsRequestingNextStep(e)
        if (!e) setIsLoading(false)
      },
      setIsNextStepConfirmed
    )
  )

  useEffect(() => {
    const updateIdentityId = async () => {
      if (!promotion.identityId) {
        const identityId = await getUserCognitoIdentityPoolId()
        setPromotion({ ...promotion, identityId })
      }
    }
    updateIdentityId()
  }, [])

  // gets the component according to what step we are on
  useEffect(() => {
    setComponent(
      getComponentByStep(
        promotion,
        updatePromotion,
        isRequestingNextStep,
        (e) => {
          setIsRequestingNextStep(e)
          if (!e) setIsLoading(false)
        },
        setIsNextStepConfirmed
      )
    )
  }, [JSON.stringify(promotion), isRequestingNextStep])

  // calback when the child component confirms next step
  useEffect(() => {
    const changeStep = async () => {
      if (isNextStepConfirmed) {
        if (promotion.stepNumber < 2) {
          updatePromotion('stepNumber', promotion.stepNumber + 1)
          setIsLoading(false)
        } else {
          let aPromotion = { ...promotion }
          if (promotion.stepNumber === OrderedWizardSteps.Ad.step) {
            const ad = await handleImageSave()
            console.log('UPDATING PROMOTION WITH NEW AD EITAN')
            aPromotion = { ...aPromotion, ad: ad }
          }
          console.log('SAVING PROMOTION TO SERVER AND INCREMENTING STEP EITAN')
          saveAndContinue(aPromotion)
        }
      }
      setIsNextStepConfirmed(false)
      setIsRequestingNextStep(false)
    }

    changeStep()
  }, [isNextStepConfirmed])

  const nextStep = () => {
    setIsLoading(true)
    // Asks the child component if we're cool to go to next step
    setIsRequestingNextStep(true)
  }

  const previousStep = () => {
    updatePromotion('stepNumber', promotion.stepNumber - 1)
  }

  if (isRedirecting) {
    return <Redirect to='/campaigns' />
  }

  return (
    <main className='h-100'>
      <div className='container-fluid h-100'>
        <div className='row steps'>
          <div className='col-lg-3 steps-line-container'>
            <StepLine
              steps={Object.keys(OrderedWizardSteps).reduce((a, b, idx) => {
                if (idx === 1)
                  return [
                    { name: a, ...OrderedWizardSteps[a] },
                    { name: b, ...OrderedWizardSteps[b] },
                  ]
                return [...a, { name: b, ...OrderedWizardSteps[b] }]
              })}
              currentStep={promotion.stepNumber}
            />
          </div>
          <div className='col-lg-9 d-flex justify-content-end align-items-center'>
            <p className='small text-black-50'>
              Step <span>3</span> of <span>6</span>
            </p>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-3 summary' style={{ zIndex: 100 }}>
            {component}
            <br />
            <div className='row pb-3'>
              <div className='col d-flex justify-content-center'>
                <button
                  type='button'
                  className='btn btn-outline-dark'
                  disabled={
                    promotion.stepNumber === OrderedWizardSteps.Templates.step
                  }
                  onClick={() => previousStep()}>
                  Back
                </button>
              </div>
              {promotion.stepNumber === OrderedWizardSteps.Payment.step ? (
                ''
              ) : (
                <div className='col d-flex justify-content-center'>
                  <LoadingButton
                    type='button'
                    className='btn btn-primary'
                    isLoading={isLoading}
                    onClick={() => nextStep()}>
                    Next
                  </LoadingButton>
                </div>
              )}
            </div>
          </div>
          <div className='col-lg-9 preview'>
            {promotion.stepNumber !== OrderedWizardSteps.Ad.step ? (
              <Preview promotion={promotion} isLive={false} />
            ) : (
              <AdPreview promotion={promotion} imageRef={imageElement} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
