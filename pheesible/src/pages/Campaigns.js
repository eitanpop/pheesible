import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'

import usePromotion from '../hooks/api/usePromotions'
import facebook from '../images/facebook.png'
import edit from '../images/edit.png'
import report from '../images/report.png'

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
  const { loading, error, data: promotions } = usePromotion()
  const [chosenPromotion, setChosenPromotion] = useState(null)
  const [isRedirecting, setIsRedirecting] = useState(null)
  const [filter, setFilter] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('wolp')) localStorage.removeItem('wolp')
  }, [])

  useEffect(() => {
    if (chosenPromotion === null || promotions === null) return
    setPromotion({ ...promotions.find((x) => x.id === chosenPromotion) })
    setIsRedirecting(true)
  }, [chosenPromotion])

  if (loading) return <div>Loading...</div>
  if (error) {
    console.log('error', error)
    return <div>There was an unexpected error</div>
  }
  console.log('promotions', promotions)
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
          <br />
          <a
            className='btn btn btn-success my-2 mr-3 my-sm-0 btn-new'
            href='/wizard'>
            CREATE NEW CAMPAIGN +
          </a>
        </div>
        <div className='col-sm-10'>
          {!promotions.some((x) => filter === null || x.statusId === filter) ? (
            <span>Nothing to show here</span>
          ) : (
            <>
              <div className='mt-3 h3'>CAMPAIGNS</div>
              <div className='table-responsive'>
                <table className='table text-center'>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Cost</th>
                    <th>Create Date</th>
                    <th>Start Date</th>
                    <th>Total Days</th>
                  </tr>

                  <tbody>
                    {promotions
                      .filter((x) => filter === null || x.statusId === filter)
                      .map((x) => {
                        return (
                          <tr key={x.id}>
                            <td>{x.name}</td>
                            <td>{getStatusElement(x.statusId)}</td>
                            <td>
                              {x.charge
                                ? '$' + parseFloat(parseInt(x.charge) / 100).toFixed(
                                    2
                                  )
                                : 'N/A'}
                            </td>
                            <td>{x.createDate}</td>
                            <td>{x.startDate || 'N/A'}</td>
                            <td>
                              {x.facebook ? (
                                <>
                                  <img
                                    src={facebook}
                                    alt='facebook'
                                    className='icon'
                                  />
                                  <span className='ml-3'>
                                    {x.facebook.numberOfDays} days
                                  </span>
                                </>
                              ) : (
                                ''
                              )}
                            </td>
                            <td>
                              {x.statusId === 1 ? (
                                <a
                                  href='#'
                                  enabled={x.statusId === 1}
                                  onClick={() => {
                                    console.log('editing')
                                    setChosenPromotion(x.id)
                                  }}>
                                  <img className='icon' src={edit} alt='edit' />
                                </a>
                              ) : (
                                <img className='icon' src={edit} alt='edit' />
                              )}{' '}
                              {x.statusId === 5 || x.statusId === 6 ? (
                                <a href={'/report?id=' + x.id}>
                                  <img
                                    className='icon'
                                    src={report}
                                    alt='report'
                                  />
                                </a>
                              ) : (
                                <img
                                  className='icon'
                                  src={report}
                                  alt='report'
                                />
                              )}
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
