import React, { useState, useEffect } from "react"
import EventForm from "./EventForm"
import EventTile from "./EventTile"
import _ from "lodash"

const BallotShowContainer = (props) => {
  const stateId = props.match.params.state_id
  const ballotId = props.match.params.id
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
  const [ errors, setErrors ] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0)

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

  const addNewEvent = (formPayload) => {
      fetch(`/api/v1/states/${stateId}/ballots/${ballotId}/events`, {
        credentials: 'same-origin',
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formPayload)
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
      .then(response => response.json())
      .then(response => {
        if (response.event) {
          setEvents(events)
          window.alert(response.message)
        } else {
          setErrors(response.errors)
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  const handleInputChange = (event) => {
   setNewEvent({
     ...newEvent,
     [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const validSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["title", "description", "address", "city", "state", "date", "time"]
    requiredFields.forEach((field) => {
      if (newEvent[field].trim() === "") {
        submitErrors = {
          ...submitErrors, [field]: "cannot be blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validSubmission()) {
      addNewEvent(newEvent)
      clearForm()
    }
  }

  const clearForm = (event) => {
   setNewEvent({
     title: "",
     description: "",
     address: "",
     city: "",
     state: "",
     date: "",
     time: ""
   })
 }

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
        creatorContact={event.creator_contact}
        responses={event.responses}
        approved={event.approved}
        stateId={stateId}
      />
    )
  })

  return (
    <div>
      <div className="my-container">
        <div className= "upcoming-events">
          <h2>Upcoming Events for <span>{ballot.name}</span></h2>
        </div>
      {eventTiles}
      </div>
      <EventForm
        handleInputChange={handleInputChange}
        newEvent={newEvent}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </div>
  )
}

export default BallotShowContainer
