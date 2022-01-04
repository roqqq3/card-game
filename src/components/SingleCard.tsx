import styled, { keyframes } from 'styled-components'
import { Card } from '../cards/Card'

const CardContainer = styled.div`
  align-text: center;
  align-items: center;
  width: 60vw;
  max-width: 500px;
  height: 70vh;
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

const Fade = styled.div`
  display: inline-block;
  visibility: 'visible';
  animation: ${fadeIn} 0.5s linear;
  transition: visibility 1s linear;
`

const StyledTitle = styled.h1`
  font-size: calc(2em + 1vw);
  font-variant: helvetica;
  text-align: center;
  color: #FA6E4F;
`

const StyledDescription = styled.p`
  font-size: calc(1.5em + 0.7vw);
  font-variant: helvetica;
  text-align: center; 
  color: #FA6E4F;
`

interface SingleCardProps {
  card?: Card
}

const SingleCard = ({ card }: SingleCardProps) => {
  return card 
    ? <CardContainer key={card.name}>
        <Fade>
          <CardContainer key={card.name}>
            <StyledTitle>{card.name}</StyledTitle>
            <StyledDescription>{card.description}</StyledDescription>
          </CardContainer>
        </Fade>
      </CardContainer>
    : null;
}

export default SingleCard