import React from 'react'
import styled, { keyframes } from 'styled-components'

const CardContainer = styled.div`
  text-align: center
  max-width: 500px
  height: 500px
`

const fadeIn = keyframes`
  from {
    transform: scale(.25);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(.25);
    opacity: 0;
  }
`;

const Fade = styled.div`
  display: inline-block;
  visibility: ${props => props.out ? 'hidden' : 'visible'};
  animation: ${props => props.out ? fadeOut : fadeIn} 0.5s linear;
  transition: visibility 1s linear;
`;

const StyledTitle = styled.h1`
  font-size: 3.5em
  font-variant: helvetica
  text-align: center
  color: #FA6E4F
`

const StyledDescription = styled.p`
  font-size: 2em
  font-variant: helvetica
  text-align: center
  color: #FA6E4F
`;

const Card = (props) => {
  return (
    <CardContainer key={props.card.name}>
      <Fade>
        <StyledTitle>{props.card.name}</StyledTitle>
        <StyledDescription>{props.card.description}</StyledDescription>
      </Fade>
    </CardContainer>
  )
}

export default Card