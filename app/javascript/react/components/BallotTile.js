import React, { useState } from "react"

const BallotTile = (props) => {

  return (
    <div>
      <h3 id="ballot-name">Referendum: {props.name}</h3>
      <p id="ballot-subject">Subject: {props.subject}</p>
      <p id="ballot-description">Details: {props.description}</p>
    </div>
  )
}

export default BallotTile
