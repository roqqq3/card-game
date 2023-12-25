import { useState } from 'react';
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

const StyledInput = styled.input`
  padding: 1rem;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  font-size: 1.3em;
  width: 100%;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  max-width: 300px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

interface AddPlayerModalProps {
  players: string[];
  handleNewPlayer: (name: string) => void;
  closeModal: () => void;
}
 
const AddPlayerModal = (props: AddPlayerModalProps) => {

  const [ newPlayerName, setNewPlayerName ] = useState('');

  const handleNewPlayerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPlayerName(event.target.value);
  }

  const handleNewPlayerName = (evt: React.FormEvent) => {
    evt.preventDefault()
    if (!props.players.includes(newPlayerName) && newPlayerName !== '' && newPlayerName.length < 30) {
      props.handleNewPlayer(newPlayerName)
      setNewPlayerName('')
    }
    props.closeModal()
  }

  return (
    <Modal>
      <p></p> 
      <ButtonContainer>
        <StyledInput
          value={newPlayerName} 
          placeholder='Kirjoita nimi'
          onChange={handleNewPlayerNameChange} 
        />
        <StyledButtonContainer>
          <StyledAddButton onClick={props.closeModal}>
              Peru
          </StyledAddButton>
          <StyledAddButton type='submit' onClick={handleNewPlayerName}>
              Lisää
          </StyledAddButton>
        </StyledButtonContainer>
      </ButtonContainer>
    </Modal>
  )
}

export default AddPlayerModal;