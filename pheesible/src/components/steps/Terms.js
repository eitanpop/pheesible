import React from 'react'

import useError from '../../hooks/useError'
import ErrorMessage from '../ErrorMessage'
import CardSubTitle from '../wizard/CardSubTitle'
import HeaderSpacer from '../wizard/HeaderSpacer'

export default ({
  promotion,
  updatePromotion,
  isRequestingNextStep,
  stopRequestingNextStep,
  setIsNextStepConfirmed,
}) => {
  const error = useError(
    isRequestingNextStep,
    stopRequestingNextStep,
    setIsNextStepConfirmed,
    (addError, setIsValid) => {
      if (!promotion.termsConditionsAccepted) {
        setIsValid(false)
        addError('global', 'Must accept the terms &amp; conditions')
      }
    },
    [JSON.stringify(promotion)]
  )

  return (
    <div className='card'>
      <div className='card-body'>
        <CardSubTitle tooltip=''>Terms &amp; Conditions</CardSubTitle>
        <HeaderSpacer />
        <div className='form-group'>
          <textarea
            class='form-control'
            id='exampleFormControlTextarea1'
            rows='20'
            value={promotion.freeText}
            disabled></textarea>
        </div>
        <div class='form-group form-check'>
          <input
            type='checkbox'
            class='form-check-input'
            id='exampleCheck1'
            onChange={(e) =>
              updatePromotion('termsConditionsAccepted', e.target.checked)
            }
            checked={promotion.termsConditionsAccepted}
          />
          <label class='form-check-label' for='exampleCheck1'>
            I accept the terms &amp; conditions
          </label>
          <ErrorMessage errorMessage={error.global} />
        </div>
      </div>
    </div>
  )
}
