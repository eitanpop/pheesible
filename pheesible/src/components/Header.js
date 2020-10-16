import React, { useState, useEffect } from 'react'

import UserMenu from './UserMenu'
import { getUserGroups } from '../services/auth'
import logo from '../images/Logo.png'

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
      <nav className='navbar navbar-expand-lg navbar-dark container-fluid header'>
        {/* Logo image */}
        <a className='navbar-brand' href='/'>
          <img src={logo} width={187} height={46} alt='logo' />
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
        <div
          className='collapse navbar-collapse'
          style={{ marginLeft: '3em' }}
          id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <a className='nav-link' href='/'>
                HOME
              </a>
            </li>{' '}
            <li className='nav-item active ml-5'>
              <a className='nav-link' href='/campaigns'>
                CAMPAIGNS
              </a>
            </li>
            {isAdmin ? (
              <>
                <li className='nav-item active ml-5'>
                  <a className='nav-link' href='/admin'>
                    ADMINISTRATION
                  </a>
                </li>
              </>
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
            <UserMenu />
          </div>
        </div>
      </nav>
    </header>
  )
}
