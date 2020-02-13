import React, { useState } from "react"
import ResponseTile from "./ResponseTile"

const EventTile = props => {
  const [ responses, setResponses ] = useState(props.responses)

  const { id, title, description, address, city, state, date, time, ballot_id, creator_id } = props

  const addResponse = () => {
    fetch(`/api/v1/events/${id}/responses`, {
      credentials: "same-origin",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage)
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      setResponses(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return (
    <div>
      <h2>Event:{title}</h2>
      <p>{description}</p>
      <p>{address}</p>
      <p>{city}</p>
      <p>{state}</p>
      <p>{date}</p>
      <p>{time}</p>
      <ResponseTile
      addResponse={addResponse}
      />
      {responses.length} other people are attending

    </div>
  )
}

export default EventTile;
