import React, { useState} from "react"

const UserEventTile = (props) => {

const { title, description, address, city, state, date, time, ballot_id, creator_id } = props
  return (
    <div>
      <h3>Event:{title}</h3>
      <p>{description} {address} {city} {date} {time}</p>
    </div>
  )
}

export default UserEventTile
