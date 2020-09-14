import { Auth } from 'aws-amplify'

export const getUserCognitoIdentityPoolId = async () =>
  (await Auth.currentCredentials()).identityId
