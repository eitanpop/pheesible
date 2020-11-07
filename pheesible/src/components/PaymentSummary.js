import React from 'react'

import facebook from '../images/facebook.jpg'
import instagram from '../images/instagram.png'
import CardTitle from './wizard/CardTitle'
import HeaderSpacer from './wizard/HeaderSpacer'

export default ({ promotion }) => {
  if (!promotion.facebook) return <></>
  const Facebook = () => {
    const {
      numberOfDays,
      budgetPerDayInDollars,
      includeInstagram,
    } = promotion.facebook

    return (
      <>
        <CardTitle tooltip='An itemized list of your order including your focus group budget and payment to Pheesible'>
          ORDER SUMMARY
        </CardTitle>
        <HeaderSpacer />
        <div class='row mt-3 text-muted'>
          <div class='col'>
            <div class='media'>
              <img
                src={facebook}
                alt='facebook'
                class='mr-2'
                style={{ width: '45px' }}
              />
              {includeInstagram ? (
                <img
                  src={instagram}
                  alt='instagram'
                  class='mr-2'
                  style={{ width: '45px' }}
                />
              ) : (
                ''
              )}
            </div>
          </div>
          <div class='col pt-3'>{numberOfDays} days</div>
          <div class='col pt-3'></div>
          <div class='col-auto pt-3'>${budgetPerDayInDollars}/day</div>
        </div>
      </>
    )
  }

  return (
    <div>
      <Facebook />
      <hr />
    </div>
  )
}
