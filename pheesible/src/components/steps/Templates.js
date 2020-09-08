import React from 'react'
import { Template } from '../../constants'

export default ({ promotion, updatePromotion }) => {
  return (
    <div>
      <div>TEMPLATES</div>
      <div
        className='form-check'
        onChange={(e) => updatePromotion('template', parseInt(e.target.value))}>
        <input
          type='radio'
          value={Template.Business}
          name='template'
          defaultChecked={promotion.template === Template.Business}
        />
        Business
        <br />
        <input
          type='radio'
          value={Template.WideLogo}
          name='template'
          defaultChecked={promotion.template === Template.WideLogo}
        />{' '}
        Wide Logo
      </div>
    </div>
  )
}