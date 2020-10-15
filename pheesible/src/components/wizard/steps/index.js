import React, { useState } from 'react'
import './stepline.css'

export default ({ steps, currentStep }) => {
  console.log('steps', steps)
  const [lineLength, setLineLength] = useState(0)
  const largeSteps = steps.filter((x) => x.size === 2)
  const smallSteps = steps.filter((x) => x.size === 1)
  const segmentSize = 100 / (largeSteps.length - 1)

  const currentStepObject = steps.find((x) => x.step === currentStep)

  if (currentStepObject.size === 2) {
    const localLineLength =
      largeSteps.findIndex((x) => x.step === currentStepObject.step) *
      segmentSize
    if (lineLength !== localLineLength) setLineLength(localLineLength)
  } else if (currentStepObject.size === 1) {
    const previousBigs = largeSteps.filter(
      (x) => x.step < currentStepObject.step
    )
    const lastBig = previousBigs[previousBigs.length - 1]

    const smallIdx =
      steps.find((x) => x.step === currentStepObject.step).step - lastBig.step

    const nextBig =
      largeSteps[largeSteps.findIndex((x) => x.step === lastBig.step) + 1]

    const localLineLength =
      largeSteps.findIndex((z) => z.step === lastBig.step) * segmentSize +
      (segmentSize / (nextBig.step - lastBig.step)) * smallIdx

    if (lineLength !== Math.round(localLineLength))
      setLineLength(Math.round(localLineLength))
  }

  return (
    <section id='stepline'>
      <div className='section-wrapper'>
        <div
          className='line'
          style={{
            background: `linear-gradient(to right, #45D681 ${lineLength}%, #CCCCCC ${lineLength}%)`,
          }}>
          {largeSteps.map((x, idx) => {
            const nextLargeStep = largeSteps[idx + 1]
            return (
              <>
                <div
                  data-mobiletext={x.name}
                  data-index={1}
                  className={`step dot  ${
                    currentStep === x.step
                      ? 'active'
                      : currentStep > x.step
                      ? 'complete'
                      : ''
                  }`}
                  style={{ left: `${idx * segmentSize}%` }}></div>

                {nextLargeStep
                  ? smallSteps
                      .filter(
                        (y) => y.step < nextLargeStep.step && y.step > x.step
                      )
                      .map((z, smallIdx, elements) => {
                        return (
                          <div
                            data-mobiletext={x.name}
                            data-index={1}
                            className={`quarter dot ${
                              currentStep === z.step
                                ? 'active'
                                : currentStep > z.step
                                ? 'complete'
                                : ''
                            }`}
                            style={{
                              left: `${
                                idx * segmentSize +
                                (smallIdx + 1) *
                                  (segmentSize / (elements.length + 1))
                              }%`,
                            }}></div>
                        )
                      })
                  : ''}
              </>
            )
          })}
        </div>
      </div>
    </section>
  )

  return (
    <section id='stepline'>
      <div className='section-wrapper'>
        <div
          className='line'
          style={{
            background: 'linear-gradient(to right, #45D681 50%, #CCCCCC 50%)',
          }}>
          <div
            data-mobiletext='Landing Page Creation'
            data-index={1}
            className='step dot complete'
            style={{ left: 0 }}>
            <a href='#'>1</a>
          </div>
          <div
            data-mobiletext={2}
            data-index={2}
            className='quarter q1 dot complete'
            style={{ left: '14%' }}>
            <a href='#'>2</a>
          </div>
          <div
            data-mobiletext={3}
            data-index={3}
            className='quarter q2 dot complete'
            style={{ left: '26%' }}>
            <a href='#'>3</a>
          </div>
          <div
            data-mobiletext={4}
            data-index={4}
            className='quarter q3 dot complete'
            style={{ left: '38%' }}>
            <a href='#'>4</a>
          </div>
          <div
            data-mobiletext='Ads Set Up'
            data-index={5}
            className='step dot active'
            style={{ left: '50%' }}>
            <a href='#'>5</a>
          </div>
          <div
            data-mobiletext={1}
            data-index={6}
            className='quarter q4 dot'
            style={{ left: '75%' }}>
            <a href='#'>6</a>
          </div>
          <div
            data-mobiletext='Payment'
            data-index={7}
            className='step dot'
            style={{ left: '100%' }}>
            <a href='#'>7</a>
          </div>
        </div>
      </div>
    </section>
  )
}
