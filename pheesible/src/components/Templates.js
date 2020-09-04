import React from 'react'
import { Template } from '../constants'

export default ({ promotion, updatePromotion }) => {
  return (
    <div>
      <div>TEMPLATES</div>
      <div
        class='form-check'
        onChange={(e) => updatePromotion('template', parseInt(e.target.value))}>
        <input
          type='radio'
          value={Template.Business}
          name='template'
          checked={promotion.template === Template.Business}
        />
        Business
        <br />
        <input
          type='radio'
          value={Template.WideLogo}
          name='template'
          checked={promotion.template === Template.WideLogo}
        />{' '}
        Wide Logo
      </div>
    </div>
  )
}
