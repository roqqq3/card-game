import { useState } from 'react';
import styled from 'styled-components'

const Modal = styled.div`
  background: #ffcfb8;
  position: absolute;
  bottom: calc(50% - 5rem);
  left: calc(50% - 10rem);
  width: 20rem;
  height: 10rem;
  border-radius: 1rem;
  border: 1px solid #FB8E7E;
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
  margin: 0.25em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  font-size: 1.3em;
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