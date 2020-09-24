import { useState, useEffect } from 'react'
import _ from 'lodash'

export default (
  isRequestingNextStep,
  stopRequestingNextStep,
  setIsNextStepConfirmed,
  validatorFunction,
  dependencies
) => {
  const [error, setError] = useState({})
  const [isValidating, setIsValidating] = useState(false)

  let errorAggregate = {}
  const addError = (key, value) => {
    errorAggregate = { ...errorAggregate, [key]: value }
  }

  useEffect(() => {
    if (isRequestingNextStep) setIsValidating(true)
  }, [isRequestingNextStep])

  useEffect(() => {
    if (!isValidating) return
    let isValid = true
    const setIsValid = (valid) => {
      isValid = valid
    }
    validatorFunction(addError, setIsValid)

    if (!_.isEqual(error, errorAggregate)) setError(errorAggregate)

    if (!isValid) stopRequestingNextStep()

    if (isValid && isRequestingNextStep) setIsNextStepConfirmed(true)
  }, [isValidating, dependencies])

  return error
}
