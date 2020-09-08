import React, { useEffect } from 'react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
  AmplifyConfirmSignUp,
} from '@aws-amplify/ui-react'

export default ({ children }) => {
  const [authState, setAuthState] = React.useState()
  const [user, setUser] = React.useState()

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setUser(authData)
    })
  }, [])

  return authState === AuthState.SignedIn && user ? (
    <>{children}</>
  ) : (
    <AmplifyAuthenticator userNameAlias='email'>
      <AmplifySignUp
        slot='sign-up'
        usernameAlias='email'
        formFields={[
          {
            type: 'email',
            label: 'Email / Username',
            required: true,
          },
          {
            type: 'password',
            label: 'Custom Password Label',
            placeholder: 'custom password placeholder',
            required: true,
          },
          {
            type: 'given_name',
            label: 'First Name',
            placeholder: 'Enter your first name',
            required: true,
          },
          {
            type: 'family_name',
            label: 'Last Name',
            placeholder: 'Enter your last name',
            required: true,
          },
          {
            type: 'phone_number',
            label: 'Phone Number',
            placeholder: 'Enter your phone number',
            required: false,
          },
        ]}
      />
      <AmplifySignIn slot='sign-in' usernameAlias='email' />
      <AmplifyConfirmSignUp slot='confirm-sign-up' usernameAlias='email'  />
    </AmplifyAuthenticator>
  )
}
