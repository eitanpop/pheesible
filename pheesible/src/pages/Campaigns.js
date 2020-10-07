import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'

import ApiContext from '../context/promotionContext'

const getStatusElement = (status) => {
  const props = { className: 'btn', style: { cursor: 'default' } }
  switch (status) {
    case 1:
      return (
        <div {...props} className={props.className + ' btn-outline-primary'}>
          DRAFT
        </div>
      )

    case 2:
      return (
        <div {...props} className={props.className + ' btn-warning'}>
          CHARGING
        </div>
      )

    case 3:
      return (
        <div {...props} className={props.className + ' btn-outline-info'}>
          AWAITING AD PUBLISH
        </div>
      )
    case 4:
      return (
        <div {...props} className={props.className + ' btn-info'}>
          AWAITING REVIEW
        </div>
      )
    case 5:
      return (
        <div {...props} className={props.className + ' btn-primary'}>
          RUNNING
        </div>
      )
    case 6:
      return (
        <div {...props} className={props.className + ' btn-success'}>
          DONE
        </div>
      )
    case 7:
      return (
        <div {...props} className={props.className + ' btn-danger'}>
          ERROR{' '}
        </div>
      )
    default:
      return <div></div>
  }
}

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
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-2'>
          <div className='mt-3'>STATUS</div>
          <div className='mt-2'>
            <div>
              <a
                href='#'
                onClick={(e) => setFilter(null)}
                style={{ fontWeight: filter === null ? 'bold' : 'normal' }}>
                ALL
              </a>
            </div>
            <div>
              <a
                href='#'
                onClick={(e) => setFilter(1)}
                style={{ fontWeight: filter === 1 ? 'bold' : 'normal' }}>
                DRAFTS
              </a>
            </div>
            <div>
              <a
                href='#'
                onClick={(e) => setFilter(2)}
                style={{ fontWeight: filter === 2 ? 'bold' : 'normal' }}>
                RUNNING
              </a>
            </div>
          </div>
        </div>
        <div className='col-lg-10'>
          <div className='mt-3 h3'>CAMPAIGNS</div>
          <div class='table-responsive'>
            <table className='table'>
              <tbody>
                {promotions
                  .filter((x) => filter === null || x.statusId === filter)
                  .map((x) => {
                    return (
                      <tr key={x.id}>
                        <td>{x.name}</td>
                        <td>{getStatusElement(x.statusId)}</td>
                        <td>$</td>
                        <td>{x.facebook && x.facebook.days}</td>
                        <td>
                          {' '}
                          <a
                            href='#'
                            key={x.id}
                            onClick={() => {
                              console.log('clicking')
                              setChosenPromotion(x.id)
                            }}>
                            {x.id}: {x.title}
                          </a>
                        </td>
                        <td>
                          <a href={'/report?id=' + x.id}>REPORT</a>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
