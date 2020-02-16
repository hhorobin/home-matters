import React, { useState, useEffect } from "react"
import UserEventTile from "./UserEventTile"

const UserEvents = () => {
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

  const userEventTiles = events.map((event) => {
    return(
      <UserEventTile
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
      />
    )
  })

  return (
    <div>
      <h2>Your Upcoming Events!</h2>
      {userEventTiles}
    </div>
  )
}

export default UserEvents