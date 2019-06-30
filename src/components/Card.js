import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.h1`
  font-size: 2.5em
  font-variant: helvetica
  text-align: center
  color: #FA6E4F
`

const StyledDescription = styled.p`
  font-size: 1.5em
  font-variant: helvetica
  text-align: center
  color: #FA6E4F
`;

const Card = (props) => {
  return (
    <div>
      <StyledTitle>{props.card.name}</StyledTitle>
      <StyledDescription>{props.card.description}</StyledDescription>
    </div>
  )
}

export default Card