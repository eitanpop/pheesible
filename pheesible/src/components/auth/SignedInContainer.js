import React from 'react'

import { AmplifySignOut } from '@aws-amplify/ui-react'

// Container (Master Page for signed in view)
export default ({ children }) => {
  return (
    <>
      <AmplifySignOut slot='sign-out' />
      <>{children}</>
    </>
  )
}
