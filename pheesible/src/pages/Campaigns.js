import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import CampaignTable from '../components/CampaignTable'
import usePromotion from '../hooks/api/usePromotions'

export default ({ setPromotion }) => {
  const [deletedIds, setDeletedIds] = useState([])
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

  if (isRedirecting) return <Redirect to='/wizard' />

  return (
    <div className='container-fluid h-100'>
      <div className='row h-100'>
        <div className='col-sm-2' id='sidebar'>
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
            <li>
              <a
                href='#'
                onClick={(e) => setFilter(6)}
                style={{ fontWeight: filter === 6 ? 'bold' : 'normal' }}>
                DONE
              </a>
            </li>
            <li>
              <a
                href='#'
                onClick={(e) => setFilter(7)}
                style={{ fontWeight: filter === 7 ? 'bold' : 'normal' }}>
                ERROR
              </a>
            </li>
            <li>
              <a
                href='#'
                onClick={(e) => setFilter(8)}
                style={{ fontWeight: filter === 8 ? 'bold' : 'normal' }}>
                REJECTED
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
          {!promotions.some(
            (x) =>
              filter === null ||
              (x.statusId === filter && !deletedIds.includes(x.id))
          ) ? (
            <div class='jumbotron text-center mt-5'>
              <h1>Nothing to show here</h1>
            </div>
          ) : (
            <>
              <div className='mt-3 h3'>CAMPAIGNS</div>
              <br />
              <CampaignTable
                promotions={promotions.filter(
                  (x) =>
                    (filter === null || x.statusId === filter) &&
                    !deletedIds.includes(x.id)
                )}
                setChosenPromotion={setChosenPromotion}
                onCampaignDeleted={(id) => setDeletedIds([...deletedIds, id])}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
