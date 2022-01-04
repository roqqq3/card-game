import React from 'react'
import styled from 'styled-components'

const StyledNotification = styled.p`
font-size: 1em;
font-variant: helvetica;
text-align: center;
color: #FA6E4F;
`

interface NotificationProps {
  message: string | null
}

const Notification = ({ message }: NotificationProps) => {
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