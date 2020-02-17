import React, { useState} from "react"

const UserEventTile = (props) => {

const { title, address, city, date, time, creatorContact } = props
  return (
    <div className="container">
      <h3 className="col sm-12 text-center event-title" id="event-name">{title}</h3>
      <div className="card text-center">
        <p className="event-details">{address}, {city} {date} {time}</p>
        <p id="contact-info">Can't make it? Contact {creatorContact}</p>
      </div>
    </div>
  )
}

export default UserEventTile
