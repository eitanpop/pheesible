import React, { useEffect } from 'react'

import useError from '../../hooks/useError'
import ErrorMessage from '../ErrorMessage'
import CardTitle from '../wizard/CardTitle'

import HeaderSpacer from '../wizard/HeaderSpacer'
import useTemplates from '../../hooks/api/useTemplates'
import Info from '../Info'

export default ({
  promotion,
  updatePromotion,
  isRequestingNextStep,
  stopRequestingNextStep,
  setIsNextStepConfirmed,
}) => {
  const { error: templateError, loading, data: templates } = useTemplates()

  useEffect(() => {
    if (!templates) return
    if (!promotion.templateId) {
      updatePromotion('templateId', templates[0].Id)
    }
  }, [templates, promotion.templateId])

  const { name } = promotion
  const error = useError(
    isRequestingNextStep,
    stopRequestingNextStep,
    setIsNextStepConfirmed,
    (addError, setIsValid) => {
      if (!name) {
        setIsValid(false)
        addError('name', 'Please fill out a campaign name')
      }
    },
    [JSON.stringify(promotion)]
  )

  if (templateError) return <div>Unexpected error</div>
  if (loading) return <div>Loading...</div>

  return (
    <>
      <div className='card'>
        <div className='card-body'>
          <CardTitle
            tooltip='A campaign is the way Pheesible publishes your idea and/or product in order to gather relevant data. 
          The next few steps involve answering a few questions regarding your idea in order to create an attractive and engaging landing page and banner.'>
            Campaign
          </CardTitle>
          <HeaderSpacer />
          <label htmlFor='name' className='fieldTitle'>
            Name*{' '}
            <Info
              placement='top'
              tooltip='The name to identify the campaign.'
            />
          </label>
          <input
            className={`form-control ${error.name ? ' has-error ' : ''}`}
            id='name'
            onChange={(e) => updatePromotion('name', e.target.value)}
            value={name || ''}
            maxLength='200'
          />
          <ErrorMessage errorMessage={error.name} />
          <br />
          <hr style={{ width: '90%' }} />
          <div
            className='row'
            onChange={(e) =>
              updatePromotion('templateId', parseInt(e.target.value))
            }>
            {templates.map((x, idx) => {
              return (
                <div
                  className={
                    'col-sm-6 pt-4' + (idx % 2 === 0 ? '' : ' no-left-padding')
                  }>
                  <React.Fragment key={x.Id}>
                    <input
                      type='radio'
                      value={x.Id}
                      name='template'
                      checked={promotion.templateId === x.Id}
                    />
                    <span className='ml-1'>
                      <b>{x.Name}</b>
                    </span>
                    <br />
                    <img
                      className='template-thumbnail'
                      src={`./templates/${x.Id}/thumbnail.png`}
                      alt={x.Name}
                    />
                  </React.Fragment>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
