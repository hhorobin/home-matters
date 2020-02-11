import React, { useState } from "react"

const BallotTile = (props) => {

  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.subject}</p>
      <p>{props.description}</p>
    </div>
  )
}

export default BallotTile
