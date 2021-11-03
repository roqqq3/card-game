import React from "react";
import "../Button.css";
import styled from "styled-components";

const ButtonContainer = styled.div`
  text-align: center;
`;

const StyledButton = styled.button`
  color: white;
  font-size: 2em;
  font-variant: helvetica;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 50px;
  align-items: center;
  background-color: #FB8E7E;
  outline: 0;
  :hover {
    color: #FB8E7E;
    background-color: white;
  }
`;

type ButtonProps = {
  handleTurnChange: React.MouseEventHandler<HTMLButtonElement>
}

const Button = ({ handleTurnChange }: ButtonProps) => {
  return (
    <ButtonContainer>
      <StyledButton
        className="newCardButton"
        value="newCard"
        type="submit"
        onClick={handleTurnChange}
      >
        new card
      </StyledButton>
    </ButtonContainer>
  );
};

export default Button;
