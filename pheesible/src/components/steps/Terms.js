import React from 'react'

import useValidator from '../../hooks/useValidator'
import ErrorMessage from '../ErrorMessage'
import TermsAndConditions from '../TermsAndConditions2'

export default ({
  promotion,
  updatePromotion,
  navigator
}) => {
  const error = useValidator(
    navigator,
    addError => {
      if (!promotion.termsConditionsAccepted) addError('global', 'Must accept the terms &amp; conditions')      
    },
    [JSON.stringify(promotion)]
  )

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='form-group'>
          <TermsAndConditions height='600px' />
        </div>
        <br />
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
          <br/>
          <ErrorMessage errorMessage={error.global} />
        </div>
      </div>
    </div>
  )
}
