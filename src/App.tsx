import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import GameCard from './components/GameCard'
import DrawButton from './components/DrawButton'
import Welcome from './components/Welcome'
import Toast from './components/Toast'
import AddPlayersScreen from './components/AddPlayersScreen'
import TopBar from './components/TopBar'
import TurnRail from './components/TurnRail'
import PlayersPanel from './components/PlayersPanel'
import EffectsList from './components/EffectsList'
import SideRail from './components/SideRail'
import Sheet from './components/Sheet'
import ConfirmDialog from './components/ConfirmDialog'
import { Gamestate } from './types/Gamestate';
import { Card, cards } from './cards/Card';
import { ContinuousCard } from './types/ContinuousCard';
import { clearGameSession, loadGameSession, SavedGameSession, saveGameSession } from './utils/gameSession';
import { trackViewportSize } from './utils/viewport';

type OpenSheet = 'players' | 'effects' | null

/**
 * The "you can also tap the card" hint is onboarding, not chrome. Once the
 * player has tapped the card, or has drawn enough to have found their rhythm,
 * it has done its job and should stop taking up space on every screen after.
 */
const TAP_HINT_SEEN_KEY = 'juomapeli.card-tap-hint-seen.v1'
const TAP_HINT_MAX_DRAWS = 3

const loadTapHintSeen = () => {
  try {
    return window.localStorage.getItem(TAP_HINT_SEEN_KEY) === '1'
  } catch {
    return false
  }
}

const persistTapHintSeen = () => {
  try {
    window.localStorage.setItem(TAP_HINT_SEEN_KEY, '1')
  } catch {
    // Without storage the hint simply shows again next visit.
  }
}

const hasFinePointer = () =>
  typeof window.matchMedia === 'function'
  && window.matchMedia('(hover: hover) and (pointer: fine)').matches

const App = () => {

  const [gamestate, setGamestate] = useState(Gamestate.WelcomeScreen);
  const [currentCard, setCurrentCard] = useState<Card>()
  const [message, setMessage] = useState<string | null>(null)
  const [players, setPlayers] = useState<string[]>([])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [continuousCards, setContinuousCards] = useState<ContinuousCard[]>([])
  const [previousCards, setPreviousCards] = useState<number[]>([])
  /** Draws since this screen was entered; only feeds the tap hint's retirement. */
  const [drawCount, setDrawCount] = useState(0)
  const [tapHintSeen, setTapHintSeen] = useState(loadTapHintSeen)
  const [savedGame, setSavedGame] = useState<SavedGameSession | null>(() => loadGameSession())
  const [openSheet, setOpenSheet] = useState<OpenSheet>(null)
  const [playerPendingRemoval, setPlayerPendingRemoval] = useState<string | null>(null)
  const spaceHeldRef = useRef(false)
  const handleTurnChangeRef = useRef<() => void>(() => undefined)
  const messageTimeoutRef = useRef<number>()

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
    setDrawCount(count => count + 1)

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

  const dismissTapHint = () => {
    if (tapHintSeen) return
    setTapHintSeen(true)
    persistTapHintSeen()
  }

  /** Drawing by tapping the card proves the hint has landed. */
  const handleCardTap = () => {
    dismissTapHint()
    handleTurnChange()
  }

  /**
   * All game-level keyboard handling lives here so the precedence between
   * stacked overlays is explicit rather than a side effect of which component
   * happened to attach its listener first.
   */
  useEffect(() => {
    if (gamestate !== Gamestate.Playing) return

    const handleKeyboardShortcut = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Dismiss the topmost layer only.
        if (playerPendingRemoval !== null) setPlayerPendingRemoval(null)
        else if (openSheet !== null) setOpenSheet(null)
        return
      }

      const target = event.target as HTMLElement
      const isTyping = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target.tagName) || target.isContentEditable
      if (event.code !== 'Space' || isTyping) return

      event.preventDefault()
      // A sheet or dialog on screen owns the interaction; don't draw behind it.
      if (openSheet !== null || playerPendingRemoval !== null) return
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
  }, [gamestate, openSheet, playerPendingRemoval])

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

  // Enough draws without tapping means the player is happy with the button.
  useEffect(() => {
    if (gamestate !== Gamestate.Playing || tapHintSeen) return
    if (drawCount > TAP_HINT_MAX_DRAWS) {
      setTapHintSeen(true)
      persistTapHintSeen()
    }
  }, [gamestate, drawCount, tapHintSeen])

  useEffect(() => () => window.clearTimeout(messageTimeoutRef.current), [])

  useEffect(() => trackViewportSize(), [])

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
    window.clearTimeout(messageTimeoutRef.current)
    setMessage(newMessage)
    messageTimeoutRef.current = window.setTimeout(() => setMessage(null), 4500)
  }

  const startGame = () => {
    clearGameSession()
    setSavedGame(null)
    setDrawCount(0)
    if (players.length !== 0) {
      setCurrentPlayer(0)
      handleNewCard(0)
    } else {
      handleNewCard()
    }
    showMessage(hasFinePointer()
      ? 'Vinkki: välilyönti nostaa seuraavan kortin'
      : 'Vinkki: napauta korttia nostaaksesi uuden')
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
    setDrawCount(0)
    showMessage('Peli palautettu')
    setGamestate(Gamestate.Playing)
  }

  /**
   * Leaving mid-game returns to the menu with a clean slate, so the next
   * "Nopea peli" really is player-free. The saved session survives, which is
   * what the menu's resume card offers.
   */
  const exitGame = () => {
    setOpenSheet(null)
    setPlayerPendingRemoval(null)
    setCurrentCard(undefined)
    setPlayers([])
    setCurrentPlayer(0)
    setContinuousCards([])
    setPreviousCards([])
    setDrawCount(0)
    setGamestate(Gamestate.WelcomeScreen)
  }

  const confirmPlayerRemoval = () => {
    if (playerPendingRemoval === null) return
    handlePlayerRemove(playerPendingRemoval)
    setPlayerPendingRemoval(null)
  }

  const savedGameSummary = savedGame
    ? `${savedGame.players.length === 0
      ? 'Nopea peli'
      : `${savedGame.players.length} ${savedGame.players.length === 1 ? 'pelaaja' : 'pelaajaa'}`} · ${savedGame.currentCard.name}`
    : undefined

  const savedGameSavedAt = savedGame
    ? (() => {
      const savedAt = new Date(savedGame.savedAt)
      return Number.isNaN(savedAt.getTime())
        ? undefined
        : new Intl.DateTimeFormat('fi-FI', {
          dateStyle: 'short',
          timeStyle: 'short'
        }).format(savedAt)
    })()
    : undefined

  switch (gamestate) {
    case Gamestate.AddPlayers:
      return (
        <div className='screen-center'>
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
      const activePlayer = hasPlayers ? players[currentPlayer] : undefined

      const innerClass = [
        'board__inner',
        hasPlayers ? 'board__inner--players' : '',
        hasEffects ? 'board__inner--effects' : ''
      ].filter(Boolean).join(' ')

      return <>
        <div className='board'>
          <TopBar
            playerCount={players.length}
            effectCount={continuousCards.length}
            onOpenPlayers={() => setOpenSheet('players')}
            onOpenEffects={() => setOpenSheet('effects')}
            onExit={exitGame}
          />
          {hasPlayers && <TurnRail players={players} currentPlayer={players[currentPlayer]} />}
          <div className={innerClass}>
            {hasPlayers && <div className='board__players'>
              <SideRail title='Pelaajat' count={players.length}>
                <PlayersPanel
                  players={players}
                  currentPlayer={activePlayer}
                  onAddPlayer={handleNewPlayer}
                  onRequestRemove={setPlayerPendingRemoval}
                  scrollToCurrent
                />
              </SideRail>
            </div>}
            <section className='board__stage' aria-label='Nykyinen kortti'>
              {/* Stable live region: the card inside it is keyed and remounts
                  on every draw, so the announcement has to be anchored here. */}
              <div className='board__card' aria-live='polite' aria-atomic='true'>
                <GameCard card={currentCard} owner={activePlayer} onDraw={handleCardTap} />
              </div>
              <div className='board__action'>
                <DrawButton onDraw={handleTurnChange} />
              </div>
              {/* Always rendered so the button doesn't shift when the hint retires. */}
              <p className='board__hint'>
                {!tapHintSeen && 'Voit nostaa kortin myös napsauttamalla sitä'}
              </p>
            </section>
            {hasEffects && <div className='board__effects'>
              <SideRail title='Jatkuvat kortit' count={continuousCards.length}>
                <EffectsList continuousCards={continuousCards} />
              </SideRail>
            </div>}
          </div>
        </div>

        {openSheet === 'players' && <Sheet title='Pelaajat' onClose={() => setOpenSheet(null)}>
          <PlayersPanel
            players={players}
            currentPlayer={activePlayer}
            onAddPlayer={handleNewPlayer}
            onRequestRemove={setPlayerPendingRemoval}
          />
        </Sheet>}

        {openSheet === 'effects' && <Sheet title='Jatkuvat kortit' onClose={() => setOpenSheet(null)}>
          <EffectsList continuousCards={continuousCards} />
        </Sheet>}

        {playerPendingRemoval !== null && <ConfirmDialog
          title='Poistetaanko pelaaja?'
          message={`${playerPendingRemoval} poistetaan pelistä ja hänen jatkuvat korttinsa tyhjennetään.`}
          confirmLabel='Poista'
          onConfirm={confirmPlayerRemoval}
          onCancel={() => setPlayerPendingRemoval(null)}
        />}

        <Toast message={message} />
      </>
    }
    default:
      return (
        <div className='screen-center'>
          <Welcome
            quickStartGame={startGame}
            handleSetAddPlayersScreen={handleSetAddPlayersScreen}
            hasSavedGame={Boolean(savedGame)}
            savedGameSummary={savedGameSummary}
            savedGameSavedAt={savedGameSavedAt}
            resumeGame={resumeGame}
          />
        </div>
      );
  }
}

export default App;
