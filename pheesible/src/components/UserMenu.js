import React from 'react'
import { Auth } from 'aws-amplify'
import { Dropdown } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    className='btn btn-round my-account'
    data-toggle='dropdown'
    ref={ref}
    onClick={(e) => {
      e.preventDefault()
      onClick(e)
    }}>
    <span>{children}</span>
  </a>
))

export default ({ initials }) => {
  const history = useHistory()
  return (
    <>
      <Dropdown className='d-inline'>
        <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
          {initials}
        </Dropdown.Toggle>

        <Dropdown.Menu className='show'>
          <Dropdown.Item
            onClick={async (e) => {
              await Auth.signOut()
              history.push('/login')
            }}>
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}
