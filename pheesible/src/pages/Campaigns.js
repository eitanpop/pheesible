import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'

import ApiContext from '../context/promotionContext'

export default ({ setPromotion }) => {
  const { promotions } = useContext(ApiContext)
  const [chosenPromotion, setChosenPromotion] = useState(null)
  const [isRedirecting, setIsRedirecting] = useState(null)
  const [filter, setFilter] = useState(null)
  useEffect(() => {
    if (localStorage.getItem('wolp')) localStorage.removeItem('wolp')
  }, [])

  useEffect(() => {
    if (chosenPromotion === null) return
    setPromotion({ ...promotions.find((x) => x.id === chosenPromotion) })
    setIsRedirecting(true)
  }, [chosenPromotion])
  console.log('promotions', promotions)

  if (isRedirecting) return <Redirect to='/wizard' />
  return (
    <div>
      <br />
      <br />
      <Link to='/wizard'>
        <button className='btn btn-primary'>Create a campaign</button>
      </Link>
      <br />
      <br />
      <br />
      <a
        href='#'
        onClick={(e) => setFilter(null)}
        style={{ fontWeight: filter === null ? 'bold' : 'normal' }}>
        ALL
      </a>
      |
      <a
        href='#'
        onClick={(e) => setFilter(1)}
        style={{ fontWeight: filter === 1 ? 'bold' : 'normal' }}>
        Drafts
      </a>
      |
      <a
        href='#'
        onClick={(e) => setFilter(2)}
        style={{ fontWeight: filter === 2 ? 'bold' : 'normal' }}>
        Pending
      </a>
      <br />
      <br />
      {promotions
        .filter((x) => filter === null || x.statusId === filter)
        .map((x) => {
          return (
            <>
              <a
                href='#'
                key={x.id}
                onClick={() => {
                  console.log('clicking')
                  setChosenPromotion(x.id)
                }}>
                {x.id}: {x.title}
              </a>
              <br />
            </>
          )
        })}
    </div>
  )
}
