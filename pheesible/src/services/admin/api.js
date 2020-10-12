import React from 'react'
import API from '@aws-amplify/api'

const apiName = 'pheesible-rest'

export const getCampaignsPendingReview = async () =>
  await API.get(apiName, '/admin/review')

export const approvePendingReview = async (id) => {
  await API.post(apiName, '/admin/approve', { body: { id, action: 'approve' } })
}

export const rejectPendingReview = async (id) => {
  await API.post(apiName, '/admin/approve', { body: { id, action: 'reject' } })
}
