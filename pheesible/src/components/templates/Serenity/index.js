import React from 'react'

import useLeadGenerator from '../../../hooks/useLeadGenerator'
import { features, getSellingPoint } from '../mock'

import leaves from './images/leaves.png'
import bekind from './images/bekind.png'
import circle_gold from './images/circle_gold.png'
import FeaturesImage from './images/features.png'
import focus from './images/focus.png'
import form_image from './images/form_image.png'
import jasmine from './images/jasmine.png'
import selling from './images/selling.png'
import tagline_banner from './images/tagline_banner.png'
import tagline_banner2 from './images/tagline_banner2.png'
import tagline_logo from './images/tagline_logo.png'

import './styles/serenity.css'

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
    <div style={{ backgroundColor: 'white' }}>
      <section className='serenity-tag-line'>
        <div
          className='container d-flex'
          style={{ backgroundImage: `url(${banner || tagline_banner})` }}>
          <div className='row'>
            <div className='col-12'>
              <img
                style={{ width: '220px' }}
                src={logo || tagline_logo}
                alt='tagline_logo'
              />
              <h1 className='text-left mt-3'> {title || '[Title]'}</h1>
              <h3 className='mb-md-5 pb-md-3'>{tagLine || '[Tag Line]'}</h3>
            </div>
          </div>
        </div>
        <div
          className='container d-flex'
          style={{ backgroundImage: `url(${tagline_banner2})` }}>
          <div className='row m-auto'>
            <div className='col-12 col-lg-9 offset-lg-1'>
              <h4 className='text-white text-center mx-auto my-5'>
                {elevatorPitch || '[Elevator Pitch]'}
              </h4>
            </div>
          </div>
        </div>
      </section>
      <section className='serenity-selling'>
        <div className='container'>
          <div className='row' style={{ backgroundImage: `url(${selling})` }}>
            <div className='col-md-11 offset-md-1 col-lg-7 offset-lg-5'>
              <div className='selling-item'>
                <div className='vertical'>
                  <span className='line' style={{ height: '548px' }} />
                  <img src={circle_gold} alt='' />
                  <strong>{getSellingPoint(promotion, 0, 'title')}</strong>
                </div>
                <p>{getSellingPoint(promotion, 0, 'description')}</p>
              </div>
              <div className='selling-item'>
                <div className='vertical' style={{ left: '117px' }}>
                  <span className='line' style={{ height: '316px' }} />
                  <img src={circle_gold} alt='' />
                  <strong>{getSellingPoint(promotion, 1, 'title')}</strong>
                </div>
                <p>{getSellingPoint(promotion, 1, 'description')}</p>
              </div>
              <div className='selling-item'>
                <div className='vertical' style={{ left: '233px' }}>
                  <span className='line' style={{ height: '85px' }} />
                  <img src={circle_gold} alt='' />
                  <strong>{getSellingPoint(promotion, 2, 'title')}</strong>
                </div>
                <p>{getSellingPoint(promotion, 2, 'description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='serenity-media-gallery'>
        <div className='container p-md-0'>
          <div className='row d-flex justify-content-between'>
            <div className='col-md-4'>
              <div className='img-box my-3 mx-auto mx-md-0'>
                <img className='img-fluid' src={imageOne || jasmine} alt='' />
                <h4>Be Bold</h4>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='img-box my-3 mx-auto'>
                <img className='img-fluid' src={imageTwo || bekind} alt='' />
                <h4>Be Kind</h4>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='img-box my-3 mx-auto mx-md-0 ml-md-auto'>
                <img className='img-fluid' src={imageThree || focus} alt='' />
                <h4>Focus</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='serenity-features'>
        <div className='container text-white'>
          <div
            className='row features-bg'
            style={{ backgroundImage: `url(${FeaturesImage})` }}>
            <div className='col'>
              <div className='row'>
                {(promotion.features.length
                  ? promotion.features
                  : features
                ).map((x, idx) => {
                  return (
                    <div
                      className={`col-md-5 ${
                        idx % 2 === 0 ? ' offset-md-1 ' : ''
                      }  d-flex flex-column features-item`}>
                      <h4 className='my-4'>{x.title}</h4>
                      <p>{x.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='custom mb-5'>
        <div className='container'>
          <div className='row' style={{ backgroundImage: `url(${leaves})` }}>
            <div className='col-12 px-md-5 d-flex justify-content-center align-items-center'>
              <h3 className='text-center px-md-3'>{promotion.freeText}</h3>
            </div>
          </div>
        </div>
      </section>
      <section className='feedback mb-5'>
        <div className='container'>
          <div
            className='row'
            style={{ backgroundImage: `url(${form_image})` }}>
            <div className='col-12 d-flex justify-content-center align-items-center'>
              <form>
                <h4 className='mb-4 text-center text-md-left'>
                  Sign up for more information
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
                <div className='d-flex'>
                  <button
                    onClick={() => {
                      if (isLive) save(promotion.id)
                    }}
                    className='btn btn-primary m-auto m-md-0'>
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
