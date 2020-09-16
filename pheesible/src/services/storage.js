import { Storage } from 'aws-amplify'

Storage.configure({ level: 'protected' })

export const put = () => {
  Storage.put('test.txt', 'Protected Content', {
    contentType: 'text/plain',
  })
    .then((result) => console.log(result))
    .catch((err) => console.log(err))
}

export const upload = async (file, path = '') => {
  console.log('file', file)
  const { name, type } = file
  try {
    const result = await Storage.put(`${path}/${name}`, file, {
      contentType: type,
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

export const remove = async (key) => {
  Storage.remove(key, { level: 'protected' })
    .then((result) => console.log(result))
    .catch((err) => console.log(err))
}
