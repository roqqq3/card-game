import React, { useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard'
import Button from './components/Button'
import Welcome from './components/Welcome'
import Notification from './components/Notification'
import AddPlayersScreen from './components/AddPlayersScreen'
import PlayerList from './components/PlayerList'
import CardEffects from './components/CardEffects'
import { Gamestate } from './types/Gamestate';
import { Card, cards } from './cards/Card';
import { ContinuousCard } from './types/ContinuousCard';

const App = () => {

  const [ gamestate, setGamestate ] = useState(Gamestate.WelcomeScreen);
  const [ currentCard, setCurrentCard ] = useState<Card>() // The current card
  const [ message, setMessage ] = useState<string | null>(null) // Used to send tips to players
  const [ players, setPlayers ] = useState<string[]>([]) // The players in the game if user has set them
  const [ currentPlayer, setCurrentPlayer ] = useState(0) // The index of the player to receive the next card
  const [ continuousCards, setContinuousCards ] = useState<ContinuousCard[]>([])
  const [ previousCards, setPreviousCards ] = useState<number[]>([]) // IDs of the previous cards

  const handleTurnChange = () => {
    if (players.length !== 0) {
      const player = updateCurrentPlayer()
      handleNewCard(player)
    } else {
      handleNewCard()
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === ' ') {
      handleTurnChange()
    }
  }

  const handleNewCard = (playerIdx?: number) => {    
    let filteredCards: Card[] = []
    while (filteredCards.length === 0) {
      // Roll for rarity
      const dice = Math.random() * 100
      filteredCards = cards
        ?.filter(c => c.rarity < dice) // Filter by rarity
        ?.filter(c => !previousCards.includes(c.id)) // Filter by previous cards
    }
    // Choose random card from these
    const cardIdx = Math.floor(Math.random() * filteredCards.length)
    const chosen = filteredCards[cardIdx]
    setCurrentCard(chosen)
    if (chosen.continuous && playerIdx !== undefined) {
      handleNewContinuousCard(chosen, players[playerIdx])
    }
    if (playerIdx !== undefined) {
      (window as any).responsiveVoice.speak(players[playerIdx] + " on sinun vuorosi!" + chosen.description, "Finnish Female")
    } else {
      (window as any).responsiveVoice.speak(chosen.description, "Finnish Female")
    }
    if (!chosen.continuous) {
      handleSetPreviousCards(chosen)
    }
  }

  const updateCurrentPlayer = () => {
    let idx = (currentPlayer + 1) % players.length
    setCurrentPlayer(idx)
    return idx
  }

  const handleSetPreviousCards = (card: Card) => {
    const logLength = 90
    const newPreviousCards = [...previousCards]
    if (newPreviousCards.length >= logLength) {
      newPreviousCards.shift()
    }
    newPreviousCards.push(card.id)
    setPreviousCards(newPreviousCards)
  }

  const handleNewContinuousCard = (card: Card, player: string) => {
    const newContinuousCards = [...continuousCards]
    for (let i = 0; i < newContinuousCards.length; i++) {
      if (newContinuousCards[i].id === card.id) {
        newContinuousCards.splice(i, 1)
      }
    }
    const newContinuousCard = {
      "id": card.id,
      "name": card.name,
      "player": player
    }
    newContinuousCards.push(newContinuousCard)
    setContinuousCards(newContinuousCards)
  }

  const handleNewPlayer = (name: string) => {
    setPlayers([...players, name])
  }

  const handleGoToWelcome = () => {
    setGamestate(Gamestate.WelcomeScreen)
  }

  const handleSetAddPlayersScreen = () => {
    setGamestate(Gamestate.AddPlayers)
  }

  const showMessage = (message: string) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  
  const quickStartGame = () => {
    handleNewCard()
    setPlayers([])
    showMessage("Pressing SPACE will draw a new card")
    setGamestate(Gamestate.Playing)
  }

  const startGame = () => {
    handleNewCard()
    if (players.length !== 0) {
      setCurrentPlayer(0)
    }
    showMessage("Pressing SPACE will draw a new card")
    setGamestate(Gamestate.Playing)
  }

  switch (gamestate) {
    case Gamestate.AddPlayers:
      return ( 
        <div className='centered'>
            <AddPlayersScreen
              players={players}
              handleNewPlayer={handleNewPlayer}
              handleGoToWelcome={handleGoToWelcome}
              startGame={startGame}
            />
        </div>
      )
    case Gamestate.Playing:
      return (
        <div className='mainContainer' tabIndex={0} onKeyUp={handleKeyUp}>
          <div className='playerList'>
            <PlayerList
              players={players}
              currentPlayer={players[currentPlayer]}
            />
          </div>
          <div className='centered'>
            <div className='gameScreen'>
              <SingleCard
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
    default:
      return (
        <div className='centered'>
          <Welcome 
            quickStartGame={quickStartGame}
            handleSetAddPlayersScreen={handleSetAddPlayersScreen}
          />
        </div>
      );
  }
}

export default App;

