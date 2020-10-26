import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import UserMenu from './UserMenu'
import { getUserGroups } from '../services/auth'
import logo from '../images/Logo.png'

export default ({ isAuthenticated }) => {
  const [isAdmin, setIsAdmin] = useState()
  const [initials, setInitials] = useState()
  useEffect(() => {
    const PageLoad = async () => {
      const userGroups = await getUserGroups()
      setIsAdmin(userGroups && userGroups[0] === 'Admin')
      if (isAuthenticated) {
        const user = await Auth.currentUserInfo()
        console.log('user', user)
        if (
          user &&
          user.attributes &&
          user.attributes.given_name &&
          user.attributes.family_name
        )
          setInitials(
            user.attributes.given_name.charAt(0) +
              user.attributes.family_name.charAt(0)
          )
      }
    }
    PageLoad()
  })
  if (isAuthenticated === null) return <></>
  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-dark container-fluid header'>
        {/* Logo image */}
        <Link className='navbar-brand' to='/'>
          <img src={logo} width={187} height={46} alt='logo' />
        </Link>
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
              <Link className='nav-link' to='/'>
                HOME
              </Link>
            </li>{' '}
            {isAuthenticated ? (
              <>
                <li className='nav-item active ml-5'>
                  <Link className='nav-link' to='/campaigns'>
                    CAMPAIGNS
                  </Link>
                </li>
                {isAdmin ? (
                  <li className='nav-item active ml-5'>
                    <Link className='nav-link' to='/admin'>
                      ADMINISTRATION
                    </Link>
                  </li>
                ) : (
                  ''
                )}
              </>
            ) : (
              <li className='nav-item active ml-5'>
                <Link to='/login' className='nav-link'>
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
          {isAuthenticated ? (
            <div className='my-2 my-lg-0'>
              <a
                className='btn btn btn-success my-2 mr-3 my-sm-0 btn-new'
                href='/wizard'>
                New +
              </a>
              <UserMenu initials={initials} />
            </div>
          ) : (
            ''
          )}
        </div>
      </nav>
    </header>
  )
}
