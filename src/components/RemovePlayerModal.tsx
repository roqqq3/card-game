import styled from 'styled-components'

const Modal = styled.div`
  background: #ffcfb8;
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(20rem, 80%);
  height: auto;
  border-radius: 1rem;
  border: 1px solid #FB8E7E;
  padding: 0.5rem;
  transform: translate(-50%, -50%);
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const StyledAddButton = styled.button`
  color: white;
  font-size: 2rem;
  font-variant: helvetica;
  margin: 0.25rem;
  padding: 0.5rem 0.5rem;
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

const StyledText = styled.p`
  font-size: calc(1.5em + 0.7vw);
  font-variant: helvetica;
  text-align: center; 
  color: #FA6E4F;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`

interface RemovePlayerModalProps {
  player: string;
  closeModal: () => void;
  handlePlayerRemove: (name: string) => void;
}
 
const RemovePlayerModal = (props: RemovePlayerModalProps) => {
  
  const submitRemove = () => {
    props.handlePlayerRemove(props.player);
    props.closeModal();
  }

  return (
    <Modal>
      <p></p> 
      <ButtonContainer>
        <StyledText>Haluatko varmasti poistaa pelaajan {props.player}?</StyledText>
        <StyledButtonContainer>
          <StyledAddButton onClick={props.closeModal}>
              Jätä
          </StyledAddButton>
          <StyledAddButton type='submit' onClick={submitRemove}>
              Poista
          </StyledAddButton>
        </StyledButtonContainer>
      </ButtonContainer>
    </Modal>
  )
}

export default RemovePlayerModal;