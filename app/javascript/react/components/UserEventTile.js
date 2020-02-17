import React, { useState} from "react"

const UserEventTile = (props) => {

const { title, description, address, city, state, date, time, ballotId, creatorContact } = props
  return (
    <div className="container">
      <h3 className="col sm-12 text-center event-title">{title}</h3>
      <div className="card text-center">
        <p className="event-details">{address} {city} {date} {time}</p>
        <p>Can't make it? Contact {creatorContact}</p>
      </div>
    </div>
  )
}

export default UserEventTile
