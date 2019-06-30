import React from 'react'
import styled from 'styled-components'

const StyledNotification = styled.p`
font-size: 1em
font-variant: helvetica
text-align: center
color: #FA6E4F
`

const Notification = ({ message }) => {
  if (message !== null) {
    return (
      <div className="message">
        <StyledNotification>
          {message}
        </StyledNotification>
      </div>
    )
  } else {
    return null
  }
}

export default Notification