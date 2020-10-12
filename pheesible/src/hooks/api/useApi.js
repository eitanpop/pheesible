import React, { useState, useEffect } from 'react'

export default (api, dependency = null, ...args) => {
  const [result, setResult] = useState({
    loading: true,
    error: null,
    data: null,
  })
  const argJson = JSON.stringify(args)
  useEffect(() => {
    const callApi = async () => {
      try {
        setResult({ loading: true })
        setResult({ loading: false, data: await api(...args) })
      } catch (e) {
        setResult({ loading: false, error: e })
      }
    }
    callApi()
  }, [api.name, argJson, dependency])

  return result
}
