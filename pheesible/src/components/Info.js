import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({ tooltip, placement }) => {
  return (
    <OverlayTrigger
      key={placement}
      placement={placement}
      overlay={<Tooltip id={`tooltip-${placement}`}>{tooltip}</Tooltip>}>
      <i className='fa fa-info-circle'></i>
    </OverlayTrigger>
  )
}
