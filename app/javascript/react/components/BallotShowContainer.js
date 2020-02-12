import React, { useState, useEffect } from "react"

const BallotShowContainer = (props) => {
  const [ ballot, setBallot ] = useState({
    name: "",
    description: ""
  })

  useEffect(() => {
    fetch(`/api/v1${props.match.url}`)
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
      setBallot(response)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, [])

  return (
    <div>
    <p>{ballot.name}</p>
    <p>{ballot.description}</p>
    </div>
  )
}

export default BallotShowContainer
