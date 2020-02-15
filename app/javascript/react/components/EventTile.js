import React, { useState } from "react"
import ResponseTile from "./ResponseTile"

const EventTile = props => {
  const [ responses, setResponses ] = useState(props.responses)
  const [ className, setClassName ] = useState("hidden")
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

  const sendHostText = () => {
    fetch(`/api/v1/events/${id}/alert_host`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(body => {
      setClassName("responded")
      return body
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
      sendHostText={sendHostText}
      addResponse={addResponse}
      />
      <div className={className}>We'll let the host know to expect you!</div>
      <p className="attendees">Going: {responses.length}</p>
    </div>
  )
}

export default EventTile;
