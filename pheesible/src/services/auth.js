import { Auth } from 'aws-amplify'

export const getUserCognitoIdentityPoolId = async () =>
  (await Auth.currentCredentials()).identityId

export const getUserGroups = async () => {
  return (await Auth.currentSession()).getAccessToken().payload[
    'cognito:groups'
  ]
}
