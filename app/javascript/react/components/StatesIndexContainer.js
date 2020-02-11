import React, { useState, useEffect } from "react"
import StateTile from "./StateTile"
import MapChart from "./MapChart"

const StatesIndexContainer = props => {
  const [ states, setStates ] = useState([])

  useEffect(() => {
    fetch("/api/v1/states")
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
    .then(body => {
      setStates(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  const stateTiles = states.map(state => {
    return(
      <div>
        <StateTile
          key={state.id}
          id={state.id}
          name={state.name}
        />
      </div>
    )
  })

  return (
    <div>
      <h3 className="index-title">Select Your state</h3>
      {stateTiles}
    </div>
  )
}

export default StatesIndexContainer;
