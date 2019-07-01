import React, { useState, useEffect } from 'react';
import axios from 'axios'
import KeyHandler, { KEYDOWN } from 'react-key-handler';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card'
import Button from './components/Button'
import Welcome from './components/Welcome'
import Notification from './components/Notification'
import AddPlayersScreen from './components/AddPlayersScreen'
import PlayerList from './components/PlayerList'
import CardEffects from './components/CardEffects'

const App = () => {

  const [ cards, setCards ] = useState(['']) //the cards that are loaded from json
  const [ newCard, setNewCard ] = useState(0) //index of the current card
  const [ game, setGame ] = useState(false) //boolean whether game is started
  const [ addPlayersScreen, setAddPlayersScreen ] = useState(false) //boolean whether add players screen is on
  const [ message, setMessage ] = useState(null) //used to send tips to players
  const [ players, setPlayers ] = useState([]) //the players in the game if user has set them
  const [ newPlayerName, setNewPlayerName ] = useState('') //the value of the name field when adding a new player
  const [ currentPlayer, setCurrentPlayer ] = useState(0) //the index of the player to receive the next card

  const handleNewCard = () => { //TODO: all cards should not have same odds
    if (players.length !== 0) {
      setCurrentPlayer((currentPlayer + 1) % players.length)
    }
    let index = Math.floor(Math.random() * (cards.length))
    if (index !== cards.length && index !== newCard) {
      setNewCard(index)
    } else {
      handleNewCard()
    }
  }

  const handleNewPlayerNameChange = (event) => {
    setNewPlayerName(event.target.value)
  }

  const handleNewPlayer = (event) => {
    event.preventDefault()
    if (!players.includes(newPlayerName) && newPlayerName !== '') {
      setNewPlayerName('')
      let newPlayers = [...players]
      newPlayers.push(newPlayerName)
      setPlayers(newPlayers)
    }
  }

  const handleGoToWelcome = () => {
    setGame(false)
    setAddPlayersScreen(false)
  }

  const handleSetAddPlayersScreen = () => {
    setAddPlayersScreen(true)
  }

  const showMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  
  const quickStartGame = () => {
    setPlayers([])
    showMessage("Pressing SPACE will draw a new card")
    setGame(true)
  }

  const startGame = () => {
    if (players.length !== 0) {
      setCurrentPlayer(0)
    }
    setAddPlayersScreen(false)
    showMessage("Pressing SPACE will draw a new card")
    setGame(true)
  }

  useEffect(() => {
    axios.get('cards.json')
      .then( reponse => {
        setCards(reponse.data.cards)
      })
  }, [])

  if (addPlayersScreen) {
    return ( 
      <div className='centered'>
        <div>
          <AddPlayersScreen
            newPlayerName={newPlayerName}
            players={players}
            handleNewPlayer={handleNewPlayer}
            handleNewPlayerNameChange={handleNewPlayerNameChange}
            handleGoToWelcome={handleGoToWelcome}
            startGame={startGame}
          />
        </div>
      </div>
    )
  } else if (game) {
    return (
      <div className='mainContainer'>
        <div className='playerList'>
          <PlayerList
            players={players}
            currentPlayer={currentPlayer}
          />
        </div>
        <div className='centered'>
          <div className='gameScreen'>
            <KeyHandler //binds space to new card
                keyEventName={KEYDOWN}
                keyValue=" "
                onKeyHandle={handleNewCard}
            />
            <Card
              card={cards[newCard]}
            />
            <Button
              handleNewCard={handleNewCard}
            />
            <Notification
              message={message}
            />
          </div>
        </div>
        <div className='effectList'>
          <CardEffects/>
        </div>
      </div>
    )
  } else {
    return (
      <div className='centered'>
        <Welcome 
          quickStartGame={quickStartGame}
          handleSetAddPlayersScreen={handleSetAddPlayersScreen}
        />
      </div>
    )
  }

}

export default App;

