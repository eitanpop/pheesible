import React from 'react'

import useLeadGenerator from '../../../hooks/useLeadGenerator'
import './styles/hero_page.css'
import { getSellingPoint, getFeature } from '../mock'
import Frame_1 from './images/Frame_1.png'
import person1 from './images/person1.png'
import person2 from './images/person2.png'
import person3 from './images/person3.png'
import Frame_2 from './images/Frame_2.png'
import Frame_3 from './images/Frame_3.png'
import Frame_4 from './images/Frame_4.png'
import Frame_5 from './images/Frame_5.png'

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
    <div className='hero-page'>
      <section className='hero'>
        <div className='container d-flex'>
          <div className='row'>
            <div className='col-lg-6'>
              {logo ? <img src={logo} className='hero-logo' alt='logo' /> : ''}
              <h1
                style={{ textTransform: 'uppercase' }}
                className='text-left pr-2'>
                {title || 'Title'}
              </h1>
              <h2 className='text-left pr-2'>{tagLine || '[Tag Line]'}</h2>
              <p>{elevatorPitch || '[Elevator Pitch]'}</p>
            </div>
            <div className='col-lg-6 d-flex justify-content-center'>
              <img
                src={Frame_1}
                className='d-block m-auto ml-md-5 img-fluid'
                alt=''
              />
            </div>
          </div>
        </div>
      </section>
      <section className='selling-points'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-4 text-center text-md-left'>
              <img src={imageOne || person1} className='img-fluid mt-5' alt='img' />
              <h4 className='mb-4 px-md-5'>
                {getSellingPoint(promotion, 0, 'title')}
              </h4>
              <p className='px-md-5'>
                {getSellingPoint(promotion, 0, 'description')}
              </p>
            </div>
            <div className='col-lg-4 text-center text-md-left'>
              <img src={imageTwo || person2} className='img-fluid mt-5' alt='img' />
              <h4 className='mb-4 px-md-5'>
                {getSellingPoint(promotion, 1, 'title')}
              </h4>
              <p className='px-md-5'>
                {getSellingPoint(promotion, 1, 'description')}
              </p>
            </div>
            <div className='col-lg-4 text-center text-md-left'>
              <img src={imageThree || person3} className='img-fluid mt-5' alt='img' />
              <h4 className='mb-4 px-md-5'>
                {getSellingPoint(promotion, 2, 'title')}
              </h4>
              <p className='px-md-5'>
                {getSellingPoint(promotion, 2, 'description')}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='hero-feautures'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 text-md-left'>
              <img src={Frame_2} className='img-fluid' alt='img' />
              <h4> {getFeature(promotion, 0, 'title')}</h4>
              <p className='pr-md-5 mt-4'>
                {getFeature(promotion, 0, 'description')}
              </p>
            </div>
            <div className='col-md-6 text-md-right'>
              <h4>{getFeature(promotion, 1, 'title')}</h4>
              <p className='text-md-right pl-md-5 mt-4'>
                {getFeature(promotion, 1, 'description')}
              </p>
              <img src={Frame_3} className='img-fluid' alt='img' />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 text-md-left'>
              <img src={Frame_4} className='img-fluid' alt='img' />
              <h4>{getFeature(promotion, 3, 'title')}</h4>
              <p className='pr-md-5 mt-4'>
                {getFeature(promotion, 3, 'description')}
              </p>
            </div>
            <div className='col-md-6 text-md-right'>
              <h4> {getFeature(promotion, 2, 'title')}</h4>
              <p className='text-md-right pl-md-5 mt-4'>
                {getFeature(promotion, 2, 'description')}
              </p>
              <img src={Frame_5} className='img-fluid last-img' alt='img' />
            </div>
          </div>
        </div>
      </section>
      <section className='contact-form'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 m-auto'>
              <form>
                <h4 className='mb-4 text-center text-md-left'>Contact Us</h4>
                <div className='form-group'>
                  {getPropertyComponent('firstName', {
                    className: 'form-control',
                  })}
                </div>
                <div className='form-group'>
                  {getPropertyComponent('lastName', {
                    className: 'form-control',
                  })}
                </div>
                <div className='form-group'>
                  {getPropertyComponent('email', {
                    className: 'form-control',
                  })}
                </div>
                <div className='form-group'>
                  {getPropertyComponent('phone', {
                    className: 'form-control',
                  })}
                </div>
                <div className='form-group'>
                  {getPropertyComponent('comments', {
                    className: 'form-control',
                    rows: 3,
                  })}
                </div>
                <div className='d-flex'>
                  <button
                    type='submit'
                    className='btn btn-primary m-auto mt-md-2 ml-md-0'>
                    Register
                  </button>
                </div>
              </form>
            </div>
            <div className='col-md-6 m-auto'>
              <p className='contact-form-text text-md-right pl-md-5'>
                {promotion.freeText || ''}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
