import React, { useState, useEffect } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import Card from './components/Card'
import Button from './components/Button'

const App = () => {

  const [ cards, setCards ] = useState([''])
  const [ newCard, setNewCard ] = useState(0)

  const handleNewCard = () => {
    let index = Math.floor(Math.random() * (cards.length))
    if (index !== cards.length && index !== newCard) {
      setNewCard(index)
    } else {
      handleNewCard()
    }
  }

  useEffect(() => {
    axios.get('cards.json')
      .then( reponse => {
        setCards(reponse.data.cards)
      })
  }, [])

  return (
    <div className='centered'>
      <div>
        <Card card={cards[newCard]}/>
        <Button handleNewCard={handleNewCard}/>
      </div>
    </div>
  );

}

export default App;

