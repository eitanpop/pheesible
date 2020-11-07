import React, { useState } from 'react'

import { saveLead } from '../services/api'

export default (isLive) => {
  const [properties, setProperties] = useState([
    {
      name: 'firstName',
      required: true,
      displayName: 'First Name',
      type: 'text',
      element: 'input',
    },
    {
      name: 'lastName',
      required: true,
      displayName: 'Last Name',
      type: 'text',
      element: 'input',
    },
    {
      name: 'email',
      required: true,
      displayName: 'Email',
      type: 'text',
      element: 'input',
    },
    {
      name: 'phone',
      required: true,
      displayName: 'Phone',
      type: 'text',
      element: 'input',
    },
    {
      name: 'comments',
      required: false,
      displayName: 'Comments',
      type: 'textarea',
      props: { rows: 4 },
      element: 'textarea',
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

  const getPropertyComponent = (name, props) => {
    const x = properties.find((x) => x.name === name)

    return React.createElement(x.element, {
      ...props,
      placeHolder:x.displayName,
      type: x.type,
      onChange: (e) => setProperty(x.name, e.target.value),
      value: x[x.value || ''],
    })
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
        Object.assign(
          ...properties.map((x) => {
            return { [x.name]: x.value }
          })
        )
      )
  }
  return { properties, setProperty, getPropertyComponent, save }
}
