import React from 'react'
import { Auth } from 'aws-amplify'
import { Dropdown } from 'react-bootstrap'

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    className='btn btn-round my-account'
    data-toggle='dropdown'
    ref={ref}
    onClick={(e) => {
      e.preventDefault()
      onClick(e)
    }}>
    <span>VB</span>
  </a>
))

export default () => {
  return (
    <>
      <Dropdown className='d-inline'>
        <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components' />

        <Dropdown.Menu className='show'>
          <Dropdown.Item onClick={async (e) => await Auth.signOut()}>
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}
