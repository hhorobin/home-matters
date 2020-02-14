import React, { useState, useEffect } from "react"
import EventForm from "./EventForm"
import EventTile from "./EventTile"

const BallotShowContainer = (props) => {
  const stateId = props.match.params.state_id

  const [ ballot, setBallot ] = useState({
    name: "",
    description: ""
  })
  const [ events, setEvents ] = useState([])
  const [ newEvent, setNewEvent ] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    state: "",
    date: "",
    time: ""
  })

  const handleInputChange = () => {

  }

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
      setBallot(response.ballot)
      let events = response.ballot.events
      let approved = events.filter(event => event.approved === true)
      setEvents(approved)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, [])

  const eventTiles = events.map((event) => {
    return(
      <EventTile
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
        stateId={stateId}
      />
    )
  })

  return (
    <div>
      <h2>{ballot.name}</h2>
      <h5>{ballot.description}</h5>
      {eventTiles}
      <EventForm
        handleInputChange={handleInputChange}
        newEvent={newEvent}
        />
    </div>
  )
}

export default BallotShowContainer
