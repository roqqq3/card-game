import React, { useEffect, useRef, useState } from 'react';
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
import { clearGameSession, loadGameSession, SavedGameSession, saveGameSession } from './utils/gameSession';

const App = () => {

  const [gamestate, setGamestate] = useState(Gamestate.WelcomeScreen);
  const [currentCard, setCurrentCard] = useState<Card>()
  const [message, setMessage] = useState<string | null>(null)
  const [players, setPlayers] = useState<string[]>([])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [continuousCards, setContinuousCards] = useState<ContinuousCard[]>([])
  const [previousCards, setPreviousCards] = useState<number[]>([])
  const [savedGame, setSavedGame] = useState<SavedGameSession | null>(() => loadGameSession())
  const spaceHeldRef = useRef(false)
  const handleTurnChangeRef = useRef<() => void>(() => undefined)

  const updateCurrentPlayer = () => {
    if (currentPlayer > players.length - 1) {
      setCurrentPlayer(0);
      return 0;
    }
    const idx = (currentPlayer + 1) % players.length;
    setCurrentPlayer(idx);
    return idx;
  }

  const handleSetPreviousCards = (card: Card) => {
    const logLength = 120
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
    newContinuousCards.push({
      id: card.id,
      name: card.name,
      player
    })
    setContinuousCards(newContinuousCards)
  }

  const handleNewCard = (playerIdx?: number) => {
    let filteredCards: Card[] = []
    while (filteredCards.length === 0) {
      const dice = Math.random() * 100
      filteredCards = cards
        .filter(c => c.rarity < dice)
        .filter(c => !previousCards.includes(c.id))
    }

    const cardIdx = Math.floor(Math.random() * filteredCards.length)
    const chosen = filteredCards[cardIdx]

    setCurrentCard(chosen)

    if (chosen.continuous && playerIdx !== undefined) {
      handleNewContinuousCard(chosen, players[playerIdx])
    }
    if (!chosen.continuous) {
      handleSetPreviousCards(chosen)
    }
  }

  const handleTurnChange = () => {
    if (players.length !== 0) {
      const player = updateCurrentPlayer()
      handleNewCard(player)
    } else {
      handleNewCard()
    }
  }

  handleTurnChangeRef.current = handleTurnChange

  useEffect(() => {
    if (gamestate !== Gamestate.Playing) return

    const handleKeyboardShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      const isTyping = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target.tagName) || target.isContentEditable
      if (event.code !== 'Space' || isTyping) return

      event.preventDefault()
      if (event.repeat || spaceHeldRef.current) return

      spaceHeldRef.current = true
      handleTurnChangeRef.current()
    }

    const handleKeyboardRelease = (event: KeyboardEvent) => {
      if (event.code === 'Space') spaceHeldRef.current = false
    }

    const clearHeldKeys = () => {
      spaceHeldRef.current = false
    }

    window.addEventListener('keydown', handleKeyboardShortcut)
    window.addEventListener('keyup', handleKeyboardRelease)
    window.addEventListener('blur', clearHeldKeys)

    return () => {
      window.removeEventListener('keydown', handleKeyboardShortcut)
      window.removeEventListener('keyup', handleKeyboardRelease)
      window.removeEventListener('blur', clearHeldKeys)
      clearHeldKeys()
    }
  }, [gamestate])

  useEffect(() => {
    const activeGameClass = 'game-active'
    if (gamestate === Gamestate.Playing) {
      document.body.classList.add(activeGameClass)
    } else {
      document.body.classList.remove(activeGameClass)
    }

    return () => document.body.classList.remove(activeGameClass)
  }, [gamestate])

  useEffect(() => {
    if (gamestate !== Gamestate.Playing || !currentCard) return

    const savedSession = saveGameSession({
      currentCard,
      players,
      currentPlayer,
      continuousCards,
      previousCards
    })

    if (savedSession) setSavedGame(savedSession)
  }, [gamestate, currentCard, players, currentPlayer, continuousCards, previousCards])

  const handleNewPlayer = (name: string) => {
    setPlayers([...players, name])
  }

  const handlePlayerRemove = (name: string) => {
    setContinuousCards(continuousCards.filter(c => c.player !== name));
    const newPlayers = players.filter(n => n !== name);
    setPlayers(newPlayers);
    if (currentPlayer > newPlayers.length - 1) {
      setCurrentPlayer(0);
    }
  }

  const handleGoToWelcome = () => {
    setGamestate(Gamestate.WelcomeScreen)
  }

  const handleSetAddPlayersScreen = () => {
    setGamestate(Gamestate.AddPlayers)
  }

  const showMessage = (newMessage: string) => {
    setMessage(newMessage)
    window.setTimeout(() => setMessage(null), 4500)
  }

  const startGame = () => {
    clearGameSession()
    setSavedGame(null)
    handleNewCard()
    if (players.length !== 0) {
      setCurrentPlayer(0)
    }
    showMessage('Vinkki: välilyönti nostaa seuraavan kortin')
    setGamestate(Gamestate.Playing)
  }

  const resumeGame = () => {
    if (!savedGame) return

    setCurrentCard(savedGame.currentCard)
    setPlayers(savedGame.players)
    setCurrentPlayer(savedGame.players.length === 0
      ? 0
      : Math.min(savedGame.currentPlayer, savedGame.players.length - 1))
    setContinuousCards(savedGame.continuousCards)
    setPreviousCards(savedGame.previousCards)
    showMessage('Peli palautettu')
    setGamestate(Gamestate.Playing)
  }

  const savedGameSummary = savedGame
    ? `${savedGame.players.length === 0
      ? 'Nopea peli'
      : `${savedGame.players.length} ${savedGame.players.length === 1 ? 'pelaaja' : 'pelaajaa'}`} · Kortti: ${savedGame.currentCard.name}`
    : undefined

  switch (gamestate) {
    case Gamestate.AddPlayers:
      return (
        <div className='centered'>
          <AddPlayersScreen
            handleRemovePlayer={handlePlayerRemove}
            players={players}
            handleNewPlayer={handleNewPlayer}
            handleGoToWelcome={handleGoToWelcome}
            startGame={startGame}
          />
        </div>
      )
    case Gamestate.Playing: {
      const hasPlayers = players.length > 0
      const hasEffects = continuousCards.length > 0
      const layoutClass = hasPlayers ? '' : 'quickGame'

      return <>
        <main className={`mainContainer ${layoutClass}`}>
          {hasPlayers && <aside className='playerList' aria-label='Pelaajat'>
            <PlayerList
              players={players}
              currentPlayer={players[currentPlayer]}
              handleNewPlayer={handleNewPlayer}
              handlePlayerRemove={handlePlayerRemove}
            />
          </aside>}
          <section className='gameScreen' aria-label='Nykyinen kortti'>
            {hasPlayers && <div className='mobileGameContext'>
              <div className='currentPlayerMobile'>
                Vuorossa <strong>{players[currentPlayer]}</strong>
              </div>
            </div>}
            <div className='cardStage'>
              <SingleCard
                card={currentCard}
                mobileAction={hasEffects
                  ? <CardEffects continuousCards={continuousCards} />
                  : undefined}
              />
            </div>
            <Button handleTurnChange={handleTurnChange} />
          </section>
          {hasEffects && <aside className='effectList desktopEffectList' aria-label='Jatkuvat kortit'>
            <CardEffects continuousCards={continuousCards} />
          </aside>}
        </main>
        <Notification message={message} />
      </>
    }
    default:
      return (
        <div className='centered'>
          <Welcome
            quickStartGame={startGame}
            handleSetAddPlayersScreen={handleSetAddPlayersScreen}
            hasSavedGame={Boolean(savedGame)}
            savedGameSummary={savedGameSummary}
            resumeGame={resumeGame}
          />
        </div>
      );
  }
}

export default App;
