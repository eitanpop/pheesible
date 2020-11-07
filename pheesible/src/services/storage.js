import { Storage } from 'aws-amplify'

Storage.configure({ level: 'protected' })

export const put = () => {
  Storage.put('test.txt', 'Protected Content', {
    contentType: 'text/plain',
  })
    .then((result) => console.log(result))
    .catch((err) => console.log(err))
}

export const upload = async (file, path = '', progressCallback) => {
  console.log('file', file)
  const { name, type } = file
  try {
    const result = await Storage.put(`${path}/${name}`, file, {
      contentType: type,
      progressCallback
    })
    console.log('result', result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}

export const get = async (key, identityId) => {
  console.log('key', key)
  console.log('identityId', identityId)
  return await Storage.get(key, {
    level: 'protected',
    identityId, // the identityId of that user
  })
}

export const getPublic = async key => {
    return await Storage.get(key, {
        level: 'public'
      })
}

export const remove = async (key) => {
  Storage.remove(key, { level: 'protected' })
    .then((result) => console.log('success: ' + result))
    .catch((err) => console.log('error: ' + err))
}
