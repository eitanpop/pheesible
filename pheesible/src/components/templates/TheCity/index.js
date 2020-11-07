import React from 'react'

import useLeadGenerator from '../../../hooks/useLeadGenerator'

import './styles/city.css'

import bg_intro from './images/bg_intro.png'
import bg_rectangle from './images/bg_rectangle.png'
import bg_form from './images/bg_form.png'
import ico_bulb from './images/ico_bulb.svg'
import ico_doc from './images/ico_doc.svg'
import ico_set from './images/ico_set.svg'
import sample1 from './images/sample1.png'
import sample2 from './images/sample2.png'
import sample3 from './images/sample3.png'

export default ({
  promotion,
  logo,
  banner,
  imageOne,
  imageTwo,
  imageThree,
  isLive,
}) => {
  const {
    properties,
    setProperty,
    getPropertyComponent,
    save,
  } = useLeadGenerator(isLive)
  const { title, tagLine, elevatorPitch } = promotion.fields

  return (
    <div>
      <section className='tag-line'>
        <div
          className='container'
          style={{ backgroundImage: `url(${bg_intro})` }}>
          <div className='row'>
            <div className='col-12 col-lg-8 d-flex'>
              <div className='orange-box p-2 p-md-5 d-md-flex flex-md-column justify-content-md-end'>
                <h2
                  className='text-left'
                  style={{ textTransform: 'uppercase' }}>
                  {' '}
                  {title || '[Title]'}
                </h2>
                <h3 className='text-left mt-3'> {tagLine || '[Tag Line]'}</h3>
                <h3
                  className='mb-md-5 pb-md-3 mt-1'
                  style={{ fontWeight: '400', fontSize: '1.2rem' }}>
                  {elevatorPitch || '[Elevator Pitch]'}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='selling'>
        <div className='container'>
          <div className='row py-5'>
            <div className='col-md-4 d-flex flex-column'>
              <img src={ico_doc} alt='' />
              <h4 className='text-center my-4'>
                {(promotion.sellingPoints &&
                  promotion.sellingPoints[0] &&
                  promotion.sellingPoints[0].title) ||
                  'Selling Point 1 Title'}
              </h4>
              <p>
                {(promotion.sellingPoints &&
                  promotion.sellingPoints[0] &&
                  promotion.sellingPoints[0].description) ||
                  'Selling Point 1 description'}
              </p>
            </div>
            <div className='col-md-4 d-flex flex-column'>
              <img src={ico_bulb} alt='' />
              <h4 className='text-center my-4'>
                {(promotion.sellingPoints &&
                  promotion.sellingPoints[1] &&
                  promotion.sellingPoints[1].title) ||
                  'Selling Point 2 Title'}
              </h4>
              <p>
                {(promotion.sellingPoints &&
                  promotion.sellingPoints[1] &&
                  promotion.sellingPoints[1].description) ||
                  'Selling Point 2 description'}
              </p>
            </div>
            <div className='col-md-4 d-flex flex-column'>
              <img src={ico_set} alt='' />
              <h4 className='text-center my-4'>
                {(promotion.sellingPoints &&
                  promotion.sellingPoints[2] &&
                  promotion.sellingPoints[2].title) ||
                  'Selling Point 3 Title'}
              </h4>
              <p>
                {(promotion.sellingPoints &&
                  promotion.sellingPoints[2] &&
                  promotion.sellingPoints[2].description) ||
                  'Selling Point 3 description'}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='media-gallery'>
        <div
          className='container d-flex'
          style={{
            background: `url(${bg_rectangle}) no-repeat 100% 50%, linear-gradient(270deg,  rgba(251, 176, 59, 0.74) 50%, rgba(0,0,0,0) 50%)`,
          }}>
          <div className='row m-auto'>
            <div className='col-md-4 text-center mb-4 mb-md-0'>
              <img className='img-fluid' src={imageOne || sample1} alt='' />
            </div>
            <div className='col-md-4 mt-md-5 mb-4 mb-md-0 text-center'>
              <img className='img-fluid' src={imageTwo || sample2} alt='' />
            </div>
            <div className='col-md-4 text-center'>
              <img className='img-fluid' src={imageThree || sample3} alt='' />
            </div>
          </div>
        </div>
      </section>
      <section className='features'>
        <div className='container'>
          <div className='row'>
            {promotion.features.map((x) => {
              return (
                <div className='col-md-6 d-flex flex-column'>
                  <h4 className='my-4'>{x.title}</h4>
                  <p>{x.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section className='feedback'>
        <div
          className='container'
          style={{ backgroundImage: `url(${bg_form})` }}>
          <div className='row'>
            <div className='orange-box col-12'>
              <div className='row h-100'>
                <div className='col-12 col-lg-6 mt-5 mt-lg-0 d-flex justify-content-center align-items-center'>
                  <p className='phrase-big text-center text-md-left'>
                    {promotion.freeText}
                  </p>
                </div>
                <div className='col-12 col-lg-6 mb-3 mb-lg-0 d-flex justify-content-center align-items-center'>
                  <form>
                    <h4 className='mb-4'>
                      <strong>We would love to hear from you</strong>
                    </h4>
                    <div className='form-row'>
                      <div className='form-group col-md-6'>
                        {getPropertyComponent('firstName', {
                          className: 'form-control',
                        })}
                      </div>
                      <div className='form-group col-md-6'>
                        {getPropertyComponent('lastName', {
                          className: 'form-control',
                        })}
                      </div>
                    </div>
                    <div className='form-row'>
                      <div className='form-group col-md-6'>
                        {getPropertyComponent('email', {
                          className: 'form-control',
                        })}
                      </div>
                      <div className='form-group col-md-6'>
                        {getPropertyComponent('phone', {
                          className: 'form-control',
                        })}
                      </div>
                    </div>
                    <div className='form-row'>
                      <div className='form-group col-md-12'>
                        {getPropertyComponent('comments', {
                          className: 'form-control',
                          rows: 3,
                        })}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (isLive) save(promotion.id)
                      }}
                      className='btn btn-primary'>
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
