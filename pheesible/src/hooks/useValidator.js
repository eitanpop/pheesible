import { useState, useEffect } from 'react'
import _ from 'lodash'

export default (
  { isRequestingNextStep, stopRequestingNextStep, setIsNextStepConfirmed },
  validatorFunction,
  dependencies
) => {
  const [error, setError] = useState({})
  const [isValidating, setIsValidating] = useState(false)

  useEffect(() => {
    if (isRequestingNextStep) setIsValidating(true)
  }, [isRequestingNextStep])

  useEffect(() => {
    if (!isValidating) return
    console.log('checking for errors')
    let errorAggregate = {} 
 
    validatorFunction((key, value) => {
      errorAggregate = { ...errorAggregate, [key]: value }
    }, ()=>{})  

    if (!_.isEqual(error, errorAggregate)) setError(errorAggregate)

    if (Object.keys(errorAggregate).length) stopRequestingNextStep()
    else if (isRequestingNextStep) setIsNextStepConfirmed(true)

  }, [isValidating, dependencies])

  return error
}
