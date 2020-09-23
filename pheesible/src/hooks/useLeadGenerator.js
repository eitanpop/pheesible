import { useState } from 'react'

import { saveLead } from '../services/api'

export default (isLive) => {
  const [properties, setProperties] = useState([
    {
      name: 'firstName',
      required: true,
      displayName: 'First Name',
      type: 'text',
    },
    {
      name: 'lastName',
      required: true,
      displayName: 'Last Name',
      type: 'text',
    },
    {
      name: 'email',
      required: true,
      displayName: 'Email',
      type: 'text',
    },
    {
      name: 'phone',
      required: true,
      displayName: 'Phone',
      type: 'text',
    },
  ])
  const setProperty = (name, value) => {
    const property = properties.find(
      (x) => x.name.toLowerCase() === name.toLowerCase()
    )
    if (!property) throw Error('not a supported lead generation property')
    const index = properties.findIndex(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    )
    const newProperty = { ...property, value }
    setProperties([
      ...properties.slice(0, index),
      newProperty,
      ...properties.slice(index + 1),
    ])
  }

  const save = async (promotionId) => {
    let errors = []
    console.log('properties', properties)
    properties.forEach((x) => {
      if (x.required && !x.value) errors.push(`${x.displayName} is required`)
      if (x.validate && !x.validate(x.value))
        errors.push(`${x.displayName} is invalid`)
    })
    console.log('errors', errors)
    console.log('isLive', isLive)
    if (errors.length) throw Error(errors)
    if (isLive)
      await saveLead(
        promotionId,
        Object.assign(...properties.map((x) => {
          return { [x.name]: x.value }
        }))
      )
  }
  return { properties, setProperty, save }
}
