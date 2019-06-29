import React, { useState, useEffect } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import Card from './components/Card'

const App = () => {

  const [ cards, setCards ] = useState([''])
  const [ newCard, setNewCard ] = useState(0)

  const handleNewCard = () => {
    setNewCard(Math.floor(Math.random() * (cards.length)))
  }

  useEffect(() => {
    axios.get('cards.json')
      .then( reponse => {
        setCards(reponse.data.cards)
        console.log('got data!')
      })
  }, [])

  return (
    <div>
      <Card card={cards[newCard]}/>
      <button value='newCard' type='submit' onClick={handleNewCard}>pistä uus</button>
    </div>
  );

}

export default App;

