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
          PENDING REVIEW
        </div>
      )

    case 3 || 4:
      return (
        <div {...props} className={props.className + ' btn-outline-info'}>
          PUBLISHING
        </div>
      )
    case 5:
      return (
        <div {...props} className={props.className + ' btn-info'}>
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
          ERROR
        </div>
      )
    case 8:
      return (
        <div {...props} className={props.className + ' btn-danger'}>
          REJECTED
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

  const ifAnyPromotionsHaveStatus = (statusId, component) => {
    return promotions
      .filter((x) => filter === null || x.statusId === filter)
      .some((x) => x.statusId === statusId)
      ? component
      : ''
  }

  if (isRedirecting) return <Redirect to='/wizard' />
  return (
    <div className='container-fluid h-100'>
      <div className='row h-100'>
        <div className='col-sm-2' id='sidebar'>
          <div className='mt-3'>STATUS</div>
          <ul className='mt-2 list-unstyled components'>
            <li>
              <a
                href='#'
                onClick={(e) => setFilter(null)}
                style={{ fontWeight: filter === null ? 'bold' : 'normal' }}>
                ALL
              </a>
            </li>
            <li>
              <a
                href='#'
                onClick={(e) => setFilter(1)}
                style={{ fontWeight: filter === 1 ? 'bold' : 'normal' }}>
                DRAFTS
              </a>
            </li>
            <li>
              <a
                href='#'
                onClick={(e) => setFilter(2)}
                style={{ fontWeight: filter === 2 ? 'bold' : 'normal' }}>
                PENDING REVIEW
              </a>
            </li>
            <li>
              <a
                href='#'
                onClick={(e) => setFilter(3)}
                style={{ fontWeight: filter === 3 ? 'bold' : 'normal' }}>
                READY FOR AD PUBLISH
              </a>
            </li>
            <li>
              <a
                href='#'
                onClick={(e) => setFilter(5)}
                style={{ fontWeight: filter === 5 ? 'bold' : 'normal' }}>
                RUNNING
              </a>
            </li>
          </ul>
        </div>
        <div className='col-sm-10'>
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

                        {ifAnyPromotionsHaveStatus(
                          1,
                          <td>
                            {x.statusId === 1 ? (
                              <a
                                href='#'
                                onClick={() => {
                                  console.log('editing')
                                  setChosenPromotion(x.id)
                                }}>
                                EDIT
                              </a>
                            ) : (
                              ''
                            )}{' '}
                          </td>
                        )}

                        {ifAnyPromotionsHaveStatus(
                          1,
                          <td>
                            {x.statusId === 5 || x.statusId === 6 ? (
                              <a href={'/report?id=' + x.id}>REPORT</a>
                            ) : (
                              ''
                            )}{' '}
                          </td>
                        )}
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
