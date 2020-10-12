import React, { useState, useEffect } from 'react'
import { getUserGroups } from '../services/auth'

export default () => {
  const [isAdmin, setIsAdmin] = useState()
  useEffect(() => {
    const IsAdmin = async () => {
      const userGroups = await getUserGroups()
      setIsAdmin(userGroups && userGroups[0] === 'Admin')
    }
    IsAdmin()
  })
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
              <a className='nav-link' href='/'>
                Home
              </a>
            </li>
            <li className='nav-item active'>
              <a className='nav-link' href='/campaigns'>
                Campaigns
              </a>
            </li>
            {isAdmin ? (
              <li className='nav-item active'>
                <a className='nav-link' href='/admin'>
                  Administration
                </a>
              </li>
            ) : (
              ''
            )}
          </ul>
          <div className='my-2 my-lg-0'>
            <a
              className='btn btn btn-success my-2 mr-3 my-sm-0 btn-new'
              href='/wizard'>
              New +
            </a>
            <a className='btn btn-round my-account' href='#'>
              <span>VB</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
