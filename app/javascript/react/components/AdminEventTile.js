import React, { useState} from "react"

const AdminEventTile = (props) => {

const { id, title, description, address, city, state, date, time, ballot_id, creator_id } = props

  const handleEventApproval = () => {
    let eventId = props.id
    props.approveEvent(eventId)
  }
  return (
    <div>
      <h2>Event:{title}</h2>
      <p>{description} {address} {city} {state} {date} {time}</p>
      <input id="submit" type="submit" value="Approve This Event" onClick={handleEventApproval}/>
    </div>
  )
}

export default AdminEventTile
