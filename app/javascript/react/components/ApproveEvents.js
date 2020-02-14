import React, { useState, useEffect } from "react"
import AdminEventTile from "./AdminEventTile"

const ApproveEvents = (props) => {
  const [ events, setEvents ] = useState([])

  useEffect(() => {
    fetch(`/events`)
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
      setEvents(response.events)

    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, [])

  const approveEvent = (eventId) => {
    fetch(`/events/${eventId}`, {
      credentials: 'same-origin',
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage)
        throw error
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      setEvents(response.events)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const adminEventTiles = events.map((event) => {

    return(
      <AdminEventTile
        key={event.id}
        id={event.id}
        title={event.title}
        description={event.description}
        address={event.address}
        city={event.city}
        state={event.state}
        date={event.date}
        time={event.time}
        ballotId={event.ballot_id}
        creatorId={event.creator_id}
        responses={event.responses}
        approved={event.approved}
        approveEvent={approveEvent}
      />
    )
  })
  return(
    <div>
      <h2>Events To Approve:</h2>
      {adminEventTiles}
    </div>
  )
}

export default ApproveEvents
