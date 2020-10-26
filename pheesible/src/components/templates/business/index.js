import React from 'react'

import useLeadGenerator from '../../../hooks/useLeadGenerator'

export default ({
  promotion,
  logo,
  banner,
  imageOne,
  imageTwo,
  imageThree,
  isLive,
}) => {
  const { properties, setProperty, save } = useLeadGenerator(isLive)
  const { title, tagLine, elevatorPitch } = promotion.fields
  return (
    <div>
      {/* Page Content */}
      <div className='container'>
        {/* Jumbotron Header */}
        <div
          className='jumbotron my-4'
          style={
            banner
              ? {
                  backgroundImage: `url(${banner})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }
              : {}
          }>
          <h1 className='display-3'>{title || '[Title]'}</h1>
          <h3>{tagLine || '[Tag Line]'}</h3>
          <p className='lead'>{elevatorPitch || '[Elevator Pitch]'}</p>
          <a href='#' className='btn btn-primary btn-lg'>
            Call to action!
          </a>
        </div>
        {/* Page Features */}
        <div className='row text-center'>
          <div className='col-lg-4 col-md-6 mb-4'>
            <div className='card h-100'>
              <img
                className='card-img-top'
                src={imageOne ? imageOne : 'http://placehold.it/500x325'}
                alt=''
              />
              <div className='card-body'>
                <h4 className='card-title'>Card title</h4>
                <p className='card-text'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Sapiente esse necessitatibus neque.
                </p>
              </div>
              <div className='card-footer'>
                <a href='#' className='btn btn-primary'>
                  Find Out More!
                </a>
              </div>
            </div>
          </div>

          <div className='col-lg-4 col-md-6 mb-4'>
            <div className='card h-100'>
              <img
                className='card-img-top'
                src={imageTwo ? imageTwo : 'http://placehold.it/500x325'}
                alt=''
              />
              <div className='card-body'>
                <h4 className='card-title'>Card title</h4>
                <p className='card-text'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Sapiente esse necessitatibus neque.
                </p>
              </div>
              <div className='card-footer'>
                <a href='#' className='btn btn-primary'>
                  Find Out More!
                </a>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-md-6 mb-4'>
            <div className='card h-100'>
              <img
                className='card-img-top'
                src={imageThree ? imageThree : 'http://placehold.it/500x325'}
                alt=''
              />
              <div className='card-body'>
                <h4 className='card-title'>Card title</h4>
                <p className='card-text'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Explicabo magni sapiente, tempore debitis beatae culpa natus
                  architecto.
                </p>
              </div>
              <div className='card-footer'>
                <a href='#' className='btn btn-primary'>
                  Find Out More!
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>{promotion.freeText}</div>
        {/* /.row */}
        <div className='row'>
          <div className='col'>
            {properties.map((x) => {
              return (
                <div>
                  <label>{x.displayName}</label>
                  <br />
                  {React.createElement(x.element, {
                    ...x.props,
                    type: x.type,
                    onChange: (e) => setProperty(x.name, e.target.value),
                    value: x[x.value || ''],
                  })}
                </div>
              )
            })}
            <br />
            <input
              type='button'
              onClick={() => {
                if (isLive) save(promotion.id)
              }}
              value='Save'
            />
          </div>
        </div>
      </div>
      {/* /.container */}
    </div>
  )
}
