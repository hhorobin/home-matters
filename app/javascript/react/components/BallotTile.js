import React, { useState } from "react"
import { Link } from "react-router-dom"
import BallotShowContainer from './BallotShowContainer'


const BallotTile = (props) => {
  const { id, name, stateId, subject, description } = props
  return (
    <div>
      <Link to={`/states/${stateId}/ballots/${id}`}>
        <h3 id="ballot-name">Referendum: {name}</h3>
      </Link>
      <p id="ballot-subject">Subject: {subject}</p>
      <p id="ballot-description">Details: {description}</p>
    </div>
  )
}

export default BallotTile
