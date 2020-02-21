import React, { useState, useEffect } from "react"
import AdminEventTile from "./tiles/AdminEventTile.js"

const ApproveEvents = (props) => {
  const [ events, setEvents ] = useState([])

  useEffect(() => {
    fetch(`/api/v1/events`)
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
    fetch(`/api/v1/events/${eventId}`, {
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

  const declineEvent = (eventId) => {
    fetch(`/api/v1/events/${eventId}`, {
      credentials: 'same-origin',
      method: "DELETE",
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
        creatorContact={event.creator_contact}
        responses={event.responses}
        approved={event.approved}
        approveEvent={approveEvent}
        declineEvent={declineEvent}
      />
    )
  })

  return(
    <div>
      <h2 className="text-center">Events To Approve:</h2>
      {adminEventTiles}
    </div>
  )
}

export default ApproveEvents
