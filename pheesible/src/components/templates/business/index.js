import React from 'react'

export default ({ promotion }) => {
  const { title, tagLine, elevatorPitch } = promotion.fields
  return (
    <div>
      {/* Page Content */}
      <div className='container'>
        {/* Jumbotron Header */}
        <header className='jumbotron my-4'>
          <h1 className='display-3'>{title || '[Title]'}</h1>
          <h3>{tagLine || '[Tag Line]'}</h3>
          <p className='lead'>{elevatorPitch || '[Elevator Pitch]'}</p>
          <a href='#' className='btn btn-primary btn-lg'>
            Call to action!
          </a>
        </header>
        {/* Page Features */}
        <div className='row text-center'>
          <div className='col-lg-3 col-md-6 mb-4'>
            <div className='card h-100'>
              <img
                className='card-img-top'
                src='http://placehold.it/500x325'
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
          <div className='col-lg-3 col-md-6 mb-4'>
            <div className='card h-100'>
              <img
                className='card-img-top'
                src='http://placehold.it/500x325'
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
          <div className='col-lg-3 col-md-6 mb-4'>
            <div className='card h-100'>
              <img
                className='card-img-top'
                src='http://placehold.it/500x325'
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
          <div className='col-lg-3 col-md-6 mb-4'>
            <div className='card h-100'>
              <img
                className='card-img-top'
                src='http://placehold.it/500x325'
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
        {/* /.row */}
      </div>
      {/* /.container */}
    </div>
  )
}