import React from 'react'

const Card = (props) => {
  return (
    <div>
      <h3>{props.card.name}</h3>
      {props.card.description}
    </div>
  )
}

export default Card