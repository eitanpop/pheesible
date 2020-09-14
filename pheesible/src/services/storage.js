import { Storage } from 'aws-amplify'


Storage.configure({ level: 'protected' })

export const put = () => {
  Storage.put('test.txt', 'Protected Content', {
    contentType: 'text/plain',
  })
    .then((result) => console.log(result))
    .catch((err) => console.log(err))
}
