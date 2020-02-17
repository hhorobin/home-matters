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
        title={event.title}
        address={event.address}
        city={event.city}
        date={event.date}
        time={event.time}
        creatorContact={event.creator_contact}
      />
    )
  })

  return (
    <div>
      <h2 className="text-center">Your Upcoming Events!</h2>
      {userEventTiles}
    </div>
  )
}

export default UserEvents
