import React, { useContext } from 'react'

import PromotionContext from '../../context/promotionContext'

export default ({
  promotion,
  updatePromotion,
  isValidating,
  setCurrentStepValid,
  setIsValidating,
}) => {
  const { templates } = useContext(PromotionContext)

  if (isValidating) {
    console.log('isValidating is true and setting currentStepValid to true')
    setIsValidating(false)
    setCurrentStepValid(true)
  }
  return (
    <div>
      <div>TEMPLATES</div>
      <div
        className='form-check'
        onChange={(e) =>
          updatePromotion('templateId', parseInt(e.target.value))
        }>
        {templates.map((x) => {
          return (
            <React.Fragment key={x.Id}>
              <input
                type='radio'
                value={x.Id}
                name='template'
                defaultChecked={promotion.templateId === x.Id}
              />
              {x.Name}
              <br />
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
