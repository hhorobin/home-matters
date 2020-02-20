import React, { useState } from "react"
import ResponseTile from "./ResponseTile"

const EventTile = props => {
  const [ responses, setResponses ] = useState(props.responses)
  const { id, title, description, address, city, state, date, time, ballotId, creatorContact } = props

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
    .then(response => {
      window.alert(response.message)
      return response
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-6 text-center event">
          <h3 className="event-title">{title}</h3>
          <p>{description}</p>
          <p>{address} {city}, {state}</p>
          <p>{date} at {time}</p>
          <p>Contact {creatorContact} for more info</p>
          <ResponseTile
          sendHostText={sendHostText}
          addResponse={addResponse}
          responses={responses}
          />
          <p className="attendees">Going: {responses.length}</p>
        </div>
      </div>
    </div>
  )
}

export default EventTile;
