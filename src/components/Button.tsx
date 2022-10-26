import { faDice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  text-align: center;
`;

const StyledButton = styled.button`
  color: white;
  font-size: 2rem;
  font-variant: helvetica;
  margin: 1em;
  padding: 1rem 2rem;
  border: 2px solid palevioletred;
  border-radius: 1rem;
  align-items: center;
  background-color: #FB8E7E;
  outline: 0;
  :hover {
    color: #FB8E7E;
    background-color: white;
  }
`;

interface ButtonProps {
  handleTurnChange: React.MouseEventHandler<HTMLButtonElement>
}

const Button = ({ handleTurnChange }: ButtonProps) => {
  return (
    <ButtonContainer>
      <StyledButton
        value="newCard"
        type="submit"
        onClick={handleTurnChange}
      >
        <FontAwesomeIcon icon={faDice} fixedWidth />
      </StyledButton>
    </ButtonContainer>
  );
};

export default Button;
