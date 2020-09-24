import React from 'react'

export default ({ promotion, updatePromotion, isValidating,  setCurrentStepValid, setIsValidating }) => {
  if (isValidating) {
    console.log('isValidating is true and setting currentStepValid to true')
    setIsValidating(false)
    setCurrentStepValid(true)
  }

  return (
    <div class='form-group'>
      <label for='exampleFormControlTextarea1'>Bottom Text</label>
      <textarea
        class='form-control'
        id='exampleFormControlTextarea1'
        rows='3'
        value={promotion.freeText}
        onChange={(e) =>
          updatePromotion('freeText', e.target.value)
        }></textarea>
    </div>
  )
}
