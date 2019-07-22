import React from 'react'
import styled, { keyframes } from 'styled-components'

const CardContainer = styled.div`
  align-text: center
  align-items: center
  width: 60vw
  max-width: 500px
  height: 70vh
`
//NOTE: semicolons necessary here to make the code work!
const fadeIn = keyframes`
  from {
    transform: scale(.25);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`
//NOTE: semicolons necessary here to make the code work!
const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(.25)
    opacity: 0;
  }
`

const Fade = styled.div`
  display: inline-block
  visibility: ${props => props.out ? 'hidden' : 'visible'}
  animation: ${props => props.out ? fadeOut : fadeIn} 0.5s linear
  transition: visibility 1s linear
`

const StyledTitle = styled.h1`
  font-size: calc(2em + 1vw);
  font-variant: helvetica
  text-align: center
  color: #FA6E4F
`

const StyledDescription = styled.p`
  font-size: calc(1.5em + 0.7vw);
  font-variant: helvetica
  text-align: center
  color: #FA6E4F
`

const Card = (props) => {
  return (
    <CardContainer key={props.card.name}>
      <Fade>
      <CardContainer key={props.card.name}>
        <StyledTitle>{props.card.name}</StyledTitle>
        <StyledDescription>{props.card.description}</StyledDescription>
      </CardContainer>
      </Fade>
    </CardContainer>
  )
}

export default Card