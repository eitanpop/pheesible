import React from 'react'
import './stepline.css'

export default ({steps}) => {
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
