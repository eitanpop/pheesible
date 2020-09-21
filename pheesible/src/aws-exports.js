import { Auth } from 'aws-amplify'

export default {
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: process.env.REACT_APP_AWS_REGION,
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    // OPTIONAL - Amazon Cognito Web Client ID
    userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
    identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
    authenticationFlowType: 'USER_SRP_AUTH',
  },
  Storage: {
    AWSS3: {
      bucket: process.env.REACT_APP_STORAGE, //REQUIRED -  Amazon S3 bucket name
      region: process.env.REACT_APP_AWS_REGION, //OPTIONAL -  Amazon service region
    },
  },
  API: {
    endpoints: [
      {
        name: 'pheesible-api',
        endpoint: process.env.REACT_APP_API_URL,
       
      },
    ],
  },
}
