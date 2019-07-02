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
  const [ currentCard, setCurrentCard ] = useState([]) //index of the current card
  const [ game, setGame ] = useState(false) //boolean whether game is started
  const [ addPlayersScreen, setAddPlayersScreen ] = useState(false) //boolean whether add players screen is on
  const [ message, setMessage ] = useState(null) //used to send tips to players
  const [ players, setPlayers ] = useState([]) //the players in the game if user has set them
  const [ newPlayerName, setNewPlayerName ] = useState('') //the value of the name field when adding a new player
  const [ currentPlayer, setCurrentPlayer ] = useState(0) //the index of the player to receive the next card
  const [ continuousCards, setContinuousCards ] = useState([])

  const handleTurnChange = () => {
    handleNewCard()
    if (players.length !== 0) {
      setCurrentPlayer((currentPlayer + 1) % players.length)
    }
  }

  const handleNewCard = () => { //TODO: all cards should not have same odds
    let dice = Math.random() * 100
    console.log(dice)
    let filteredCards = cards.filter(i => i.difficulty < dice)
    let index = Math.floor(Math.random() * (filteredCards.length))
    if (index !== filteredCards.length && filteredCards[index].id !== currentCard.id) {
      let chosen = filteredCards[index]
      setCurrentCard(chosen)
      if (chosen.continuous && players.length !== 0) {
        handleNewContinuousCard(chosen)
      }
    } else {
      handleNewCard()
    }
  }

  const handleNewContinuousCard = (card) => {
    let newContinuousCards = [...continuousCards]
    for (let i = 0; i < newContinuousCards.length; i++) {
      if (newContinuousCards[i].id === card.id) {
        newContinuousCards.splice(i, 1)
      }
    }
    const newContinuousCard = {
      "id": card.id,
      "name": card.name,
      "player": players[currentPlayer]
    }
    console.log(players[currentPlayer].name)
    newContinuousCards.push(newContinuousCard)
    setContinuousCards(newContinuousCards)
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
    handleNewCard()
    setPlayers([])
    showMessage("Pressing SPACE will draw a new card")
    setGame(true)
  }

  const startGame = () => {
    handleNewCard()
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
                onKeyHandle={handleTurnChange}
            />
            <Card
              card={currentCard}
            />
            <Button
              handleTurnChange={handleTurnChange}
            />
            <Notification
              message={message}
            />
          </div>
        </div>
        <div className='effectList'>
          <CardEffects
            continuousCards={continuousCards}
          />
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

