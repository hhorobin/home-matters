import React from "react"

const UserEventTile = (props) => {

const { title, address, city, date, time, creatorContact } = props
  return (
    <div className="container ">
      <h3 className="text-center event-title" id="event-name">{title}</h3>
      <div className="card text-center col-sm-5 mx-auto">
        <p className="event-details">{address}, {city} {date} {time}</p>
        <p id="contact-info">Can't make it? Contact {creatorContact}</p>
      </div>
    </div>
  )
}

export default UserEventTile
