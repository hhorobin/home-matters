import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import _ from "lodash"

import StateShow from './StateShow'
import BallotTile from './BallotTile'

const StateShowContainer = (props) => {
  const [ stateBallots, setStateBallots ] = useState([])
  const [ stateName, setStateName ] = useState("")

  let stateId = props.match.params.id

  useEffect(() => {
    fetch(`/api/v1/states/${stateId}`)
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(response => {
      setStateName(response.state.name)
      setStateBallots(response.state.ballots)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, [])

  const ballotTiles = stateBallots.map((ballot) => {
    return(
      <BallotTile
        key={ballot.id}
        id={ballot.id}
        name={ballot.name}
        subject={ballot.subject}
        description={ballot.description}
      />
    )
  })

  return (
    <div>
      <StateShow
        stateName={stateName}
      />
      {ballotTiles}
    </div>
  )
}

export default StateShowContainer