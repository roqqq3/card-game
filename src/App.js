import React, { useState, useEffect } from 'react';
import axios from 'axios'
import KeyHandler, { KEYDOWN } from 'react-key-handler';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card'
import Button from './components/Button'
import Welcome from './components/Welcome'
import Notification from './components/Notification'

const App = () => {

  const [ cards, setCards ] = useState(['']) //the cards that are loaded from json
  const [ newCard, setNewCard ] = useState(0) //index of the current card
  const [ game, setGame ] = useState(false) //boolean if game is started (welcome screen or not)
  const [ message, setMessage ] = useState(null) //used to send tips to players

  const handleNewCard = () => { //TODO: all cards should not have same odds
    let index = Math.floor(Math.random() * (cards.length))
    if (index !== cards.length && index !== newCard) {
      setNewCard(index)
    } else {
      handleNewCard()
    }
  }

  const showMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleGameStart = () => {
    showMessage("Pressing SPACE will draw a new card")
    setGame(true)
  }

  useEffect(() => {
    axios.get('cards.json')
      .then( reponse => {
        setCards(reponse.data.cards)
      })
  }, [])

  if (game) {
    return (
      <div className='centered'>
        <div className='mainContainer'>
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
    )
  } else {
    return (
      <div className='centered'>
        <Welcome 
          handleGameStart={handleGameStart}
        />
      </div>
    )
  }

}

export default App;

