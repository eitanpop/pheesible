import { useState, useEffect } from 'react'
import _ from 'lodash'

export default (
  isValidating,
  setIsValidating,
  setCurrentStepValid,
  validatorFunction,
  dependencies
) => {
  const [error, setError] = useState({})
  const [isInternallyValidating, setIsInternallyValidating] = useState(false)

  let internalError = {}
  const addError = (key, value) => {
    internalError = { ...internalError, [key]: value }
  }

  useEffect(() => {
    console.log('isValidating in setIsInternallyValidating block')
    if (isValidating) setIsInternallyValidating(true)
    setIsValidating(false)
  }, [isValidating, setIsValidating])

  useEffect(() => {
    console.log('isInternallyValidating', isInternallyValidating)
    if (!isInternallyValidating) return
    let isValid = true
    const setIsValid = (valid) => {
      isValid = valid
    }
    validatorFunction(addError, setIsValid)

    if (!_.isEqual(error, internalError)) setError(internalError)
    console.log('isValid', isValid)
    console.log('error', error)
    console.log('internalError', internalError)
    if (isValid && isValidating) setCurrentStepValid(true)
  }, [isInternallyValidating, dependencies])

  return error
}
