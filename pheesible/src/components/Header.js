import React from 'react'

export default () => {
  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark container-fluid'>
        {/* Logo image */}
        <a className='navbar-brand' href='#'>
          <img src='./dist/img/logo.png' width={111} height={46} alt='logo' />
        </a>
        {/* Mobile menu */}
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>
        {/* Desktop menu */}
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <a className='nav-link' href='#'>
                Home <span className='sr-only'>(current)</span>
              </a>
            </li>
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdown'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'>
                Campaing
              </a>
              <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <a className='dropdown-item' href='#'>
                  Campaing 1
                </a>
                <a className='dropdown-item' href='#'>
                  Campaing 2
                </a>
              </div>
            </li>
          </ul>
          <div className='my-2 my-lg-0'>
            <button className='btn btn btn-success my-2 mr-3 my-sm-0 btn-new'>
              New +
            </button>
            <a className='btn btn-round my-account' href='#'>
              <span>VB</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
