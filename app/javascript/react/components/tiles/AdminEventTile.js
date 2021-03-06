import React from "react"

const AdminEventTile = (props) => {
const { id, title, description, address, city, state, date, time, ballotId, creatorContact } = props

  const handleEventApproval = () => {
    let eventId = props.id
    props.approveEvent(eventId)
  }

  const handleEventDecline = () => {
    let eventId = props.id
    props.declineEvent(eventId)
  }
  return (
    <div className="container text-center">
      <h3 className="col sm-12 text-center event-title" id="event-name">{title}</h3>
      <div className="card text-center">
        <p className="event-details">{description} {address} {city}, {state} {date} {time}</p>
        <p id="contact-info">Host contact info: {creatorContact}</p>
      </div>
      <input id="submit" type="submit" value="Approve This Event" onClick={handleEventApproval}/>
      <input id="decline" type="submit" value="Decline This Event" onClick={handleEventDecline}/>
    </div>
  )
}

export default AdminEventTile
