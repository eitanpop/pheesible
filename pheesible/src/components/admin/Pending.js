import React, { useState } from 'react'
import JSONPretty from 'react-json-pretty'

import usePendingCampaigns from '../../hooks/api/usePendingCampaigns'
import {
  approvePendingReview,
  rejectPendingReview,
} from '../../services/admin/api'
import Images from '../../components/admin/Images'
import PendingModal from '../../components/admin/PendingModal'

export default () => {
  const [dependency, setDependency] = useState()
  const { loading, error, data: campaigns } = usePendingCampaigns(dependency)
  const [modals, setModals] = useState({})

  if (loading) return <div>Loading...</div>
  if (error) return <div>Unexpected error</div>

  return (
    <div className='table-responsive'>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date Created</th>
            <th>Facebook</th>
            <th>Ad Text</th>
            <th>Template Name</th>
            <th>Features</th>
            <th>Selling Points</th>
            <th>Images</th>
            <th>Approve or Reject</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((x) => {
            console.log('x', x)
            return (
              <tr key={x.id}>
                <td>{x.name}</td>
                <td>{x.createDate}</td>
                <td>
                  <PendingModal
                    modals={modals}
                    setModals={setModals}
                    modalProperty={x.id + 'facebook'}>
                    <JSONPretty
                      id='facebook'
                      data={JSON.stringify(x.facebook)}
                    />
                  </PendingModal>
                </td>
                <td>
                  {x.ad && x.ad.text && (
                    <PendingModal
                      modals={modals}
                      setModals={setModals}
                      modalProperty={x.id + 'adText'}>
                      {x.ad.text}
                    </PendingModal>
                  )}
                </td>
                <td>{x.templateName}</td>
                <td>
                  <PendingModal
                    modals={modals}
                    setModals={setModals}
                    modalProperty={x.id + 'features'}>
                    <JSONPretty
                      id='features'
                      data={JSON.stringify(x.features)}
                    />
                  </PendingModal>
                </td>
                <td>
                  <PendingModal
                    modals={modals}
                    setModals={setModals}
                    modalProperty={x.id + 'sellingPoints'}>
                    <JSONPretty
                      id='sellingPoints'
                      data={JSON.stringify(x.sellingPoints)}
                    />
                  </PendingModal>
                </td>
                <td>
                  <PendingModal
                    modals={modals}
                    setModals={setModals}
                    modalProperty={x.id + 'images'}>
                    <Images  promotion={x} />
                  </PendingModal>
                </td>
                <td>
                  <button
                    onClick={async () => {
                      await approvePendingReview(x.id)
                      setDependency({})
                    }}
                    className='btn btn-link'>
                    Approve
                  </button>
                  <button
                    onClick={async () => {
                      await rejectPendingReview(x.id)
                      setDependency({})
                    }}
                    className='btn btn-link'>
                    Reject
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
