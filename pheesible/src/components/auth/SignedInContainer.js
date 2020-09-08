import React from 'react'

import { AmplifySignOut } from '@aws-amplify/ui-react'

export default ({ children }) => {
  return (
    <>
      <AmplifySignOut slot='sign-out' />
      <>{children}</>
    </>
  )
}
